import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import aeroportoValidator from "../../validators/aeroportoValidator";

const form = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [aeronaves, setAeronaves] = useState([]);

  useEffect(() => {
    const aeronavesSalvas =
      JSON.parse(window.localStorage.getItem("aeronaves")) || [];
    setAeronaves(aeronavesSalvas);

    if (query.id) {
      const aeroportos =
        JSON.parse(window.localStorage.getItem("aeroportos")) || [];
      const aeroporto = aeroportos[query.id];
      if (aeroporto) {
        for (let atributo in aeroporto) {
          setValue(atributo, aeroporto[atributo]);
        }
      }
    }
  }, [query.id, setValue]);

  function salvar(dados) {
    const aeroportos =
      JSON.parse(window.localStorage.getItem("aeroportos")) || [];
    if (query.id) {
      aeroportos.splice(query.id, 1, dados);
    } else {
      aeroportos.push(dados);
    }
    window.localStorage.setItem("aeroportos", JSON.stringify(aeroportos));
    push("/aeroporto");
  }

  return (
    <Pagina titulo="Cadastro de Aeroporto" typeNavBar="adm">
      <Form className="mt-3">
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome do Aeroporto:</Form.Label>
              <Form.Control
                isInvalid={!!errors.nome}
                type="text"
                {...register("nome", aeroportoValidator.nome)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="sigla">
              <Form.Label>Sigla (IATA):</Form.Label>
              <Form.Control
                isInvalid={!!errors.sigla}
                type="text"
                placeholder="Ex: GRU"
                {...register("sigla", aeroportoValidator.sigla)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sigla?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="cidade">
              <Form.Label>Cidade:</Form.Label>
              <Form.Control
                isInvalid={!!errors.cidade}
                type="text"
                {...register("cidade", aeroportoValidator.cidade)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cidade?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            {}
            <Form.Group className="mb-3" controlId="aeronave">
              <Form.Label>Aeronave Base:</Form.Label>
              <Form.Select
                isInvalid={!!errors.aeronave}
                {...register("aeronave", {
                  required: "Selecione uma aeronave para este aeroporto",
                })}
              >
                <option value="">Selecione uma aeronave...</option>
                {aeronaves.map((item, i) => (
                  <option key={i} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.aeronave?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/aeroporto">
            <AiOutlineDoubleLeft className="me-2" />
            Voltar
          </Link>
          <Button
            className="ms-2"
            variant="outline-info"
            onClick={handleSubmit(salvar)}
          >
            <AiFillSave className="me-2" />
            Salvar Aeroporto
          </Button>
        </div>
      </Form>
    </Pagina>
  );
};

export default form;

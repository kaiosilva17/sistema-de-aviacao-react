import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import aeroportoValidator from "../../validators/aeroportoValidator";
import { mask } from "remask";
// Importando o serviço da API do IBGE
import { getEstadosBrasileiros } from "../../services/IBGEapi";

const FormAeroporto = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [aeronaves, setAeronaves] = useState([]);
  // Mudamos para um estado dinâmico que começará vazio
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const aeronavesSalvas =
      JSON.parse(window.localStorage.getItem("aeronaves")) || [];
    setAeronaves(aeronavesSalvas);

    // Carrega os estados da API do IBGE de forma assíncrona
    const carregarEstados = async () => {
      const dadosUf = await getEstadosBrasileiros();
      setEstados(dadosUf);
    };
    carregarEstados();

    if (query.id) {
      const aeroportos =
        JSON.parse(window.localStorage.getItem("aeroportos")) || [];
      const aeroporto = aeroportos[query.id];
      if (aeroporto) {
        Object.keys(aeroporto).forEach((key) => setValue(key, aeroporto[key]));
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

  function handleSiglaChange(event) {
    const valor = event.target.value.toUpperCase();
    setValue("sigla", mask(valor, "AAA"));
  }

  return (
    <Pagina titulo="Gestão de Aeroporto" typeNavBar="adm">
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome do Aeroporto:</Form.Label>
          <Form.Control
            isInvalid={!!errors.nome}
            type="text"
            placeholder="Ex: Aeroporto Internacional de Brasília"
            {...register("nome", aeroportoValidator.nome)}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nome?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="sigla">
              <Form.Label>Sigla (IATA):</Form.Label>
              <Form.Control
                isInvalid={!!errors.sigla}
                type="text"
                placeholder="Ex: BSB"
                {...register("sigla", aeroportoValidator.sigla)}
                onChange={handleSiglaChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.sigla?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={8}>
            <Form.Group className="mb-3" controlId="estado">
              <Form.Label>Estado (UF):</Form.Label>
              <Form.Select
                isInvalid={!!errors.estado}
                {...register("estado", aeroportoValidator.estado)}
              >
                <option value="">Selecione o estado...</option>
                {/* Agora mapeia os objetos vindos da API ({ id, sigla, nome }) */}
                {estados.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla} - {uf.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.estado?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="aeronave">
          <Form.Label>Aeronave Base:</Form.Label>
          <Form.Select
            isInvalid={!!errors.aeronave}
            {...register("aeronave", {
              required: "Selecione uma aeronave base",
            })}
          >
            <option value="">Selecione a aeronave...</option>
            {aeronaves.map((item) => (
              <option key={item.nome} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.aeronave?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/aeroporto">
            <AiOutlineDoubleLeft className="me-2" /> Voltar
          </Link>
          <Button
            className="ms-2"
            variant="outline-info"
            onClick={handleSubmit(salvar)}
          >
            <AiFillSave className="me-2" /> Salvar Aeroporto
          </Button>
        </div>
      </Form>
    </Pagina>
  );
};

export default FormAeroporto;

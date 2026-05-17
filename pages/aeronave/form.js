import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import aeronaveValidator from "../../validators/aeronaveValidator";

const FormAeronave = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const aeronavesPreSetadas = [
    { nome: "Boeing 737", assentos: 160 },
    { nome: "Airbus A320", assentos: 180 },
    { nome: "Embraer 195", assentos: 110 },
    { nome: "Boeing 747", assentos: 410 },
    { nome: "ATR 72", assentos: 70 },
  ];

  function salvar(dados) {
    const aeronaves =
      JSON.parse(window.localStorage.getItem("aeronaves")) || [];
    aeronaves.push(dados);
    window.localStorage.setItem("aeronaves", JSON.stringify(aeronaves));
    push("/aeronave");
  }

  function handleAeronaveChange(event) {
    const nomeSelecionado = event.target.value;
    setValue("nome", nomeSelecionado);

    const aeronave = aeronavesPreSetadas.find(
      (item) => item.nome === nomeSelecionado,
    );

    if (aeronave) {
      setValue("assentos", String(aeronave.assentos));
    } else {
      setValue("assentos", "");
    }
  }

  return (
    <Pagina titulo="Aeronave" typeNavBar="adm">
      <Form className="mt-3">
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome:</Form.Label>
              <Form.Select
                isInvalid={!!errors.nome}
                {...register("nome", aeronaveValidator.nome)}
                onChange={handleAeronaveChange}
              >
                <option value="">Selecione uma aeronave...</option>
                {aeronavesPreSetadas.map((item, index) => (
                  <option key={index} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.nome?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="assentos">
              <Form.Label>Assentos:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Automático"
                isInvalid={!!errors.assentos}
                {...register("assentos", aeronaveValidator.assentos)}
                readOnly
                className="bg-light"
              />
              <Form.Control.Feedback type="invalid">
                {errors.assentos?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/aeronave">
            <AiOutlineDoubleLeft className="me-2" /> Voltar
          </Link>
          <Button
            className="ms-2"
            variant="outline-info"
            onClick={handleSubmit(salvar)}
          >
            <AiFillSave className="me-2" /> Salvar
          </Button>
        </div>
      </Form>
    </Pagina>
  );
};

export default FormAeronave;

import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import aeronaveValidator from "../../validators/aeronaveValidator";
import { mask } from "remask";

const FormAeronave = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const CONFIG_AERONAVES = [
    { nome: "Boeing 737", assentos: 160 },
    { nome: "Airbus A320", assentos: 180 },
    { nome: "Embraer 195", assentos: 110 },
    { nome: "Boeing 747", assentos: 410 },
    { nome: "ATR 72", assentos: 70 },
  ];

  useEffect(() => {
    if (query.id) {
      const aeronaves =
        JSON.parse(window.localStorage.getItem("aeronaves")) || [];
      const dados = aeronaves[query.id];
      if (dados) {
        Object.keys(dados).forEach((key) => setValue(key, dados[key]));
      }
    }
  }, [query.id, setValue]);

  const handleAeronaveChange = (event) => {
    const modelo = event.target.value;
    setValue("nome", modelo);

    const config = CONFIG_AERONAVES.find((item) => item.nome === modelo);

    setValue("assentos", config ? String(config.assentos) : "");
  };

  const handleMaskChange = (event) => {
    const { name, value } = event.target;
    const mascara = event.target.getAttribute("mask");
    setValue(name, mask(value, mascara));
  };

  const onSubmit = (dados) => {
    const aeronaves =
      JSON.parse(window.localStorage.getItem("aeronaves")) || [];
    if (query.id) {
      aeronaves.splice(query.id, 1, dados);
    } else {
      aeronaves.push(dados);
    }
    window.localStorage.setItem("aeronaves", JSON.stringify(aeronaves));
    push("/aeronave");
  };

  return (
    <Pagina titulo="Gestão de Aeronave" typeNavBar="adm">
      <Form className="mt-3">
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Modelo da Aeronave:</Form.Label>
              <Form.Select
                isInvalid={!!errors.nome}
                {...register("nome", aeronaveValidator.nome)}
                onChange={handleAeronaveChange}
              >
                <option value="">Selecione o modelo...</option>
                {CONFIG_AERONAVES.map((item, i) => (
                  <option key={i} value={item.nome}>
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
              <Form.Label>Capacidade (Assentos):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Automático"
                isInvalid={!!errors.assentos}
                {...register("assentos", aeronaveValidator.assentos)}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                {errors.assentos?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/aeronave">
            <AiOutlineDoubleLeft className="me-2" />
            Voltar
          </Link>
          <Button
            className="ms-2"
            variant="outline-info"
            onClick={handleSubmit(onSubmit)}
          >
            <AiFillSave className="me-2" />
            Salvar Alterações
          </Button>
        </div>
      </Form>
    </Pagina>
  );
};

export default FormAeronave;

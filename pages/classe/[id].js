import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import classeValidator from "../../validators/classeValidator";

const FormClasse = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const tiposClasse = [
    { nome: "Econômica", valor: "500,00", bagagem: "10kg (Mão)" },
    { nome: "Executiva", valor: "2.500,00", bagagem: "23kg (Despachada)" },
    {
      nome: "Primeira Classe",
      valor: "5.000,00",
      bagagem: "2x 23kg (Despachada)",
    },
  ];

  useEffect(() => {
    if (query.id) {
      const classes = JSON.parse(window.localStorage.getItem("classes")) || [];
      const classe = classes[query.id];
      if (classe) {
        Object.keys(classe).forEach((atributo) =>
          setValue(atributo, classe[atributo]),
        );
      }
    }
  }, [query.id, setValue]);

  function salvar(dados) {
    const classes = JSON.parse(window.localStorage.getItem("classes")) || [];
    if (query.id) {
      classes.splice(query.id, 1, dados);
    } else {
      classes.push(dados);
    }
    window.localStorage.setItem("classes", JSON.stringify(classes));
    push("/classe");
  }

  function handleClasseChange(event) {
    const selecionada = event.target.value;
    setValue("nome", selecionada);

    const config = tiposClasse.find((item) => item.nome === selecionada);
    if (config) {
      setValue("valor", config.valor);
      setValue("bagagem", config.bagagem);
    } else {
      setValue("valor", "");
      setValue("bagagem", "");
    }
  }

  return (
    <Pagina titulo="Gestão de Classes" typeNavBar="adm">
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Tipo de Classe:</Form.Label>
          <Form.Select
            isInvalid={!!errors.nome}
            {...register("nome", classeValidator.nome)}
            onChange={handleClasseChange}
          >
            <option value="">Selecione o tipo de classe...</option>
            {tiposClasse.map((item, i) => (
              <option key={i} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.nome?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="valor">
              <Form.Label>Valor Base (R$):</Form.Label>
              <Form.Control
                type="text"
                {...register("valor")}
                readOnly
                className="bg-light"
                placeholder="Automático"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="bagagem">
              <Form.Label>Regra de Bagagem:</Form.Label>
              <Form.Control
                type="text"
                {...register("bagagem")}
                readOnly
                className="bg-light"
                placeholder="Automático"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/classe">
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

export default FormClasse;

import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import vooValidator from "../../validators/vooValidator";
import { mask } from "remask";

const form = () => {
  const { push, query } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [aeroportos, setAeroportos] = useState([]);

  const companhias = ["Latam", "Gol", "Azul", "TAP", "American Airlines"];

  const origemSelecionada = watch("origem");

  useEffect(() => {
    const aeroportosSalvos =
      JSON.parse(window.localStorage.getItem("aeroportos")) || [];
    setAeroportos(aeroportosSalvos);

    if (query.id) {
      const voos = JSON.parse(window.localStorage.getItem("voos")) || [];
      const voo = voos[query.id];
      if (voo) {
        Object.keys(voo).forEach((atributo) =>
          setValue(atributo, voo[atributo]),
        );
      }
    }
  }, [query.id, setValue]);

  function salvar(dados) {
    const voos = JSON.parse(window.localStorage.getItem("voos")) || [];
    if (query.id) {
      voos.splice(query.id, 1, dados);
    } else {
      voos.push(dados);
    }
    window.localStorage.setItem("voos", JSON.stringify(voos));
    push("/voo");
  }

  function handleChange(event) {
    const name = event.target.name;
    const valor = event.target.value;
    const mascara = event.target.getAttribute("mask");
    setValue(name, mask(valor, mascara));
  }

  return (
    <>
      <Pagina titulo="Voos" typeNavBar="adm">
        <Form className="mt-3">
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="nome_id">
                <Form.Label>ID do Voo:</Form.Label>
                <Form.Control
                  isInvalid={!!errors.nome_id}
                  placeholder="Ex: G3-1502"
                  type="text"
                  {...register("nome_id", vooValidator.nome_id)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="companhia_aerea">
                <Form.Label>Companhia Aérea:</Form.Label>
                <Form.Select
                  isInvalid={!!errors.companhia_aerea}
                  {...register("companhia_aerea", vooValidator.companhia_aerea)}
                >
                  <option value="">Selecione a companhia...</option>
                  {companhias.map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.companhia_aerea?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="origem">
                <Form.Label>Origem:</Form.Label>
                <Form.Select
                  isInvalid={!!errors.origem}
                  {...register("origem", vooValidator.origem)}
                >
                  <option value="">Selecione o aeroporto de saída...</option>
                  {aeroportos.map((item) => (
                    <option key={item.sigla} value={item.sigla}>
                      {item.nome} ({item.sigla})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.origem?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="destino">
                <Form.Label>Destino:</Form.Label>
                <Form.Select
                  isInvalid={!!errors.destino}
                  {...register("destino", {
                    ...vooValidator.destino,
                    validate: (value) =>
                      value !== origemSelecionada ||
                      "O destino não pode ser igual à origem",
                  })}
                >
                  <option value="">Selecione o aeroporto de chegada...</option>
                  {aeroportos.map((item) => (
                    <option key={item.sigla} value={item.sigla}>
                      {item.nome} ({item.sigla})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.destino?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="data">
                <Form.Label>Data do Voo:</Form.Label>
                <Form.Control
                  mask="99/99/9999"
                  placeholder="DD/MM/AAAA"
                  isInvalid={!!errors.data}
                  type="text"
                  {...register("data", vooValidator.data)}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.data?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="horario_embarque">
                <Form.Label>Horário Embarque:</Form.Label>
                <Form.Control
                  mask="99:99"
                  placeholder="Ex: 14:30"
                  isInvalid={!!errors.horario_embarque}
                  type="text"
                  {...register("horario_embarque", {
                    ...vooValidator.horario_embarque,
                    validate: (valor) => {
                      const [hora, minuto] = valor.split(":").map(Number);
                      if (hora > 23 || minuto > 59) {
                        return "Horário inválido (Máx 23:59)";
                      }
                      return true;
                    },
                  })}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.horario_embarque?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="horario_chegada">
                <Form.Label>Horário Chegada:</Form.Label>
                <Form.Control
                  mask="99:99"
                  placeholder="Deve ser após o embarque"
                  isInvalid={!!errors.horario_chegada}
                  type="text"
                  {...register("horario_chegada", {
                    ...vooValidator.horario_chegada,
                    validate: (valor) => {
                      const [hora, minuto] = valor.split(":").map(Number);

                      if (hora > 23 || minuto > 59) {
                        return "Horário inválido (Máx 23:59)";
                      }

                      const embarque = watch("horario_embarque");
                      if (embarque && valor <= embarque) {
                        return "A chegada deve ser após o embarque";
                      }

                      return true;
                    },
                  })}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.horario_chegada?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="portao">
            <Form.Label>Portão de Embarque:</Form.Label>
            <Form.Control
              isInvalid={!!errors.portao}
              placeholder="Ex: A1 ou B5 (Letra e Número)"
              type="text"
              {...register("portao", {
                ...vooValidator.portao,
                pattern: {
                  value: /^[A-Z][0-9]$/i,
                  message: "O portão deve ser uma letra seguida de um número",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.portao?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-center mt-4">
            <Link className="btn btn-outline-warning" href="/voo">
              <AiOutlineDoubleLeft className="me-2" />
              Voltar
            </Link>
            <Button
              className="ms-2"
              variant="outline-info"
              onClick={handleSubmit(salvar)}
            >
              <AiFillSave className="me-2" />
              Salvar Voo
            </Button>
          </div>
        </Form>
      </Pagina>
    </>
  );
};

export default form;

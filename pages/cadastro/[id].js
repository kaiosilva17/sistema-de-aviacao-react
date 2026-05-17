import Pagina from "../../Components/Pagina";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AiFillSave, AiOutlineDoubleLeft } from "react-icons/ai";
import cadastroValidator from "../../validators/cadastroValidator";
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

  useEffect(() => {
    if (query.id) {
      const cadastros =
        JSON.parse(window.localStorage.getItem("cadastros")) || [];
      const cadastro = cadastros[query.id];

      if (cadastro) {
        for (let atributo in cadastro) {
          setValue(atributo, cadastro[atributo]);
        }
      }
    }
  }, [query.id, setValue]);

  function salvar(dados) {
    delete dados.confirmacao_senha;

    const cadastros =
      JSON.parse(window.localStorage.getItem("cadastros")) || [];

    cadastros.splice(query.id, 1, dados);

    window.localStorage.setItem("cadastros", JSON.stringify(cadastros));
    push("/cadastro");
  }

  function handleChange(event) {
    const name = event.target.name;
    const valor = event.target.value;
    const mascara = event.target.getAttribute("mask");
    setValue(name, mask(valor, mascara));
  }

  return (
    <Pagina titulo="Editar Perfil do Usuário" typeNavBar="usuario">
      <Form className="mt-3">
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome Completo:</Form.Label>
              <Form.Control
                isInvalid={!!errors.nome}
                type="text"
                placeholder="Digite o nome completo"
                {...register("nome", cadastroValidator.nome)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="cpf">
              <Form.Label>CPF (Não editável):</Form.Label>
              <Form.Control
                readOnly
                disabled
                className="bg-secondary text-white"
                type="text"
                {...register("cpf")}
              />
              <Form.Text className="text-muted">
                O CPF não pode ser alterado.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                isInvalid={!!errors.email}
                type="email"
                placeholder="exemplo@email.com"
                {...register("email", cadastroValidator.email)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="telefone">
              <Form.Label>Telefone:</Form.Label>
              <Form.Control
                mask="(99) 99999-9999"
                isInvalid={!!errors.telefone}
                type="text"
                placeholder="(00) 00000-0000"
                {...register("telefone", cadastroValidator.telefone)}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.telefone?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="data_de_nascimento">
              <Form.Label>Data de Nascimento:</Form.Label>
              <Form.Control
                mask="99/99/9999"
                isInvalid={!!errors.data_de_nascimento}
                type="text"
                placeholder="DD/MM/AAAA"
                {...register("data_de_nascimento", {
                  ...cadastroValidator.data_de_nascimento,
                  validate: (valor) => {
                    const partes = valor.split("/");
                    if (partes.length !== 3) return "Data incompleta";

                    const dia = parseInt(partes[0]);
                    const mes = parseInt(partes[1]) - 1;
                    const ano = parseInt(partes[2]);

                    const dataNascimento = new Date(ano, mes, dia);
                    const hoje = new Date();

                    if (
                      isNaN(dataNascimento.getTime()) ||
                      dataNascimento.getDate() !== dia
                    ) {
                      return "Data inválida";
                    }

                    if (dataNascimento > hoje) {
                      return "A data não pode ser superior à atual";
                    }

                    if (ano < hoje.getFullYear() - 120) {
                      return "Data muito antiga";
                    }

                    return true;
                  },
                })}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.data_de_nascimento?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="border-top pt-3 mt-2">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="senha">
              <Form.Label>Nova Senha:</Form.Label>
              <Form.Control
                isInvalid={!!errors.senha}
                type="password"
                placeholder="Digite para alterar"
                {...register("senha", {
                  required: "A senha é necessária para salvar",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.senha?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="confirmacao_senha">
              <Form.Label>Confirmar Nova Senha:</Form.Label>
              <Form.Control
                isInvalid={!!errors.confirmacao_senha}
                type="password"
                placeholder="Repita a nova senha"
                {...register("confirmacao_senha", {
                  validate: (v) =>
                    v === watch("senha") || "As senhas não conferem",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmacao_senha?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Link className="btn btn-outline-warning" href="/cadastro">
            <AiOutlineDoubleLeft className="me-2" />
            Voltar
          </Link>
          <Button
            className="ms-2"
            variant="outline-info"
            onClick={handleSubmit(salvar)}
          >
            <AiFillSave className="me-2" />
            Salvar Alterações
          </Button>
        </div>
      </Form>
    </Pagina>
  );
};

export default form;

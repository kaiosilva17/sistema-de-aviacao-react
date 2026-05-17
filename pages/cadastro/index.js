import Pagina from "../../Components/Pagina";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BsTrash, BsFillPlusCircleFill, BsPersonFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";

const index = () => {
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    setCadastros(getAll());
  }, []);

  function getAll() {
    return JSON.parse(window.localStorage.getItem("cadastros")) || [];
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir este usuário?")) {
      const items = getAll();
      items.splice(id, 1);
      window.localStorage.setItem("cadastros", JSON.stringify(items));
      setCadastros(items);
    }
  }

  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const limpo = cpf.replace(/\D/g, "");
    return `${limpo.substring(0, 3)}.***.***-${limpo.substring(9, 11)}`;
  };

  return (
    <>
      <Pagina titulo="Gerenciar Usuários" typeNavBar="usuario">
        <Link
          href="/cadastro/form"
          style={{ background: "#4300d2", color: "white" }}
          className="mb-3 btn"
        >
          <BsFillPlusCircleFill className="me-2" />
          Novo Usuário
        </Link>

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr style={{ color: "#9400D3" }}>
              <th>Opções</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {cadastros.map((item, i) => (
              <tr key={i}>
                <td className="d-flex justify-content-center gap-3">
                  <Link href={"/cadastro/" + i}>
                    <HiPencil
                      title="Alterar"
                      className="text-primary"
                      size={20}
                    />
                  </Link>
                  <BsTrash
                    title="Excluir"
                    onClick={() => excluir(i)}
                    className="text-info"
                    style={{ cursor: "pointer" }}
                    size={20}
                  />
                </td>
                <td>
                  <BsPersonFill className="me-2" />
                  {item.nome}
                </td>
                <td>{formatarCPF(item.cpf)}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.data_de_nascimento}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {cadastros.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-muted">
              Nenhum usuário cadastrado até o momento.
            </p>
          </div>
        )}
      </Pagina>
    </>
  );
};

export default index;

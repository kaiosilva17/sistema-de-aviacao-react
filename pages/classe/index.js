import Pagina from "../../Components/Pagina";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";

const index = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setClasses(getAll());
  }, []);

  function getAll() {
    return JSON.parse(window.localStorage.getItem("classes")) || [];
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir este registro?")) {
      const items = getAll();
      items.splice(id, 1);
      window.localStorage.setItem("classes", JSON.stringify(items));
      setClasses(items);
    }
  }

  return (
    <>
      <Pagina titulo="Classes de Serviço" typeNavBar="adm">
        <Link
          href="/classe/form"
          style={{ background: "#4300d2", color: "white" }}
          className="mb-3 btn"
        >
          <BsFillPlusCircleFill className="me-2" />
          Nova Classe
        </Link>

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr style={{ color: "#9400D3" }}>
              <th className="text-center">Opções</th>
              <th>Nome da Classe</th>
              <th className="text-center">Valor Base</th>
              <th className="text-center">Bagagem Inclusa</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, i) => (
              <tr key={i}>
                <td className="text-center">
                  <Link href={"/classe/" + i}>
                    <HiPencil
                      title="alterar"
                      className="text-primary me-2"
                      size={20}
                    />
                  </Link>
                  <BsTrash
                    title="excluir"
                    onClick={() => excluir(i)}
                    className="text-info"
                    style={{ cursor: "pointer" }}
                    size={20}
                  />
                </td>
                <td>{item.nome}</td>
                <td className="text-center">
                  <strong className="text-success">R$ {item.valor}</strong>
                </td>
                <td className="text-center">
                  {}
                  <Badge bg="secondary" pill className="shadow-sm">
                    {item.bagagem}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Pagina>
    </>
  );
};

export default index;

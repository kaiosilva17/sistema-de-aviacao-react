import Pagina from "../../Components/Pagina";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { set } from "react-hook-form";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";

const index = () => {
  const [aeronaves, setAeronaves] = useState([]);

  useEffect(() => {
    setAeronaves(getAll());
  }, []);

  function getAll() {
    return JSON.parse(window.localStorage.getItem("aeronaves")) || [];
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir o resgistro?")) {
      const items = getAll();
      items.splice(id, 1);
      window.localStorage.setItem("aeronaves", JSON.stringify(items));
      setAeronaves(items);
    }
  }

  return (
    <>
      <Pagina titulo="Aeronave" typeNavBar="adm">
        <Link
          href="/aeronave/form"
          style={{ background: "#4300d2", color: "white" }}
          className="mb-2 btn "
        >
          <BsFillPlusCircleFill className="me-2" />
          Nova Aeronave
        </Link>

        <Table variant="dark" striped bordered hover>
          <thead>
            <tr style={{ color: "#9400D3" }}>
              <th>Opções</th>
              <th>Nome</th>
              <th>Assentos</th>
            </tr>
          </thead>
          <tbody>
            {aeronaves.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link href={"/aeronave/" + i}>
                    <HiPencil title="alterar" className="text-primary" />
                  </Link>
                  {""}
                  <BsTrash
                    title="excluir"
                    onClick={() => excluir(i)}
                    className="text-info"
                  />
                </td>
                <td>{item.nome}</td>
                <td>{item.assentos}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Pagina>
    </>
  );
};

export default index;

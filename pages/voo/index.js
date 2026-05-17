import Pagina from "../../Components/Pagina";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";

const index = () => {
  const [voos, setVoos] = useState([]);

  useEffect(() => {
    setVoos(getAll());
  }, []);

  function getAll() {
    return JSON.parse(window.localStorage.getItem("voos")) || [];
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir este voo?")) {
      const items = getAll();
      items.splice(id, 1);
      window.localStorage.setItem("voos", JSON.stringify(items));
      setVoos(items);
    }
  }

  return (
    <>
      <Pagina titulo="Voos" typeNavBar="adm">
        <Link
          href="/voo/form"
          style={{ background: "#4300d2", color: "white" }}
          className="mb-3 btn"
        >
          <BsFillPlusCircleFill className="me-2" />
          Novo Voo
        </Link>

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr style={{ color: "#9400D3" }}>
              <th>Opções</th>
              <th>Cód. Voo</th>
              <th>Companhia</th>
              <th>Origem</th>
              <th>Destino</th>
              <th>Embarque</th>
              <th>Chegada</th>
              <th>Portão</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {voos.map((item, i) => (
              <tr key={i}>
                <td>
                  <Link href={"/voo/" + i}>
                    <HiPencil title="Alterar" className="text-primary" />
                  </Link>{" "}
                  <BsTrash
                    title="Excluir"
                    onClick={() => excluir(i)}
                    className="text-info"
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{item.nome_id}</td>
                <td>{item.companhia_aerea}</td>
                <td>{item.origem}</td>
                <td>{item.destino}</td>
                <td>{item.horario_embarque}</td>
                <td>{item.horario_chegada}</td>
                <td>{item.portao}</td>
                <td>{item.data}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {voos.length === 0 && (
          <div className="text-center mt-4">
            <p>Nenhum voo cadastrado.</p>
          </div>
        )}
      </Pagina>
    </>
  );
};

export default index;

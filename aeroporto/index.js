import Pagina from "../../Components/Pagina";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { FaPlane } from "react-icons/fa";

const index = () => {
  const [aeroportos, setAeroportos] = useState([]);

  useEffect(() => {
    setAeroportos(getAll());
  }, []);

  function getAll() {
    return JSON.parse(window.localStorage.getItem("aeroportos")) || [];
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir o registro?")) {
      const items = getAll();
      items.splice(id, 1);
      window.localStorage.setItem("aeroportos", JSON.stringify(items));
      setAeroportos(items);
    }
  }

  return (
    <>
      <Pagina titulo="Aeroporto" typeNavBar="adm">
        <Link
          href="/aeroporto/form"
          style={{ background: "#4300d2", color: "white" }}
          className="mb-3 btn"
        >
          <BsFillPlusCircleFill className="me-2" />
          Novo Aeroporto
        </Link>

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr style={{ color: "#9400D3" }}>
              <th className="text-center">Opções</th>
              <th>Nome do Aeroporto</th>
              <th className="text-center">Sigla (IATA)</th>
              <th className="text-center">Estado (UF)</th>
              {}
              <th className="text-center">Aeronave Base</th>
            </tr>
          </thead>
          <tbody>
            {aeroportos.map((item, i) => (
              <tr key={i}>
                <td className="text-center">
                  <Link href={"/aeroporto/" + i}>
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
                  <strong>{item.sigla}</strong>
                </td>
                <td className="text-center">
                  <Badge bg="info" pill>
                    {item.estado}
                  </Badge>
                </td>
                {}
                <td className="text-center">
                  <span style={{ color: "#00f3fc" }}>
                    <FaPlane className="me-2" size={14} />
                    {item.aeronave || "Não vinculada"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {aeroportos.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-muted">Nenhum aeroporto cadastrado.</p>
          </div>
        )}
      </Pagina>
    </>
  );
};

export default index;

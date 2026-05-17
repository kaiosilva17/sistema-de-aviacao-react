import Pagina from "../../Components/Pagina";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";
import { BsTrash, BsFillPlusCircleFill } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { MdAirplaneTicket } from "react-icons/md";

const index = () => {
  const [passagens, setPassagens] = useState([]);

  useEffect(() => {
    setPassagens(getAll());
  }, []);

  function getAll() {
    return JSON.parse(window.localStorage.getItem("passagens")) || [];
  }

  function excluir(id) {
    if (confirm("Deseja realmente excluir este registro?")) {
      const items = getAll();
      items.splice(id, 1);
      window.localStorage.setItem("passagens", JSON.stringify(items));
      setPassagens(items);
    }
  }

  return (
    <>
      <Pagina titulo="Gerenciamento de Passagens" typeNavBar="usuario">
        <Link
          href="/passagem/form"
          style={{ background: "#4300d2", color: "white" }}
          className="mb-3 btn"
        >
          <BsFillPlusCircleFill className="me-2" />
          Nova Reserva
        </Link>

        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr style={{ color: "#9400D3" }}>
              <th className="text-center">Ações</th>
              <th>Passageiro</th>
              <th>Voo / Companhia</th>
              <th>Rota (O ➔ D)</th>
              <th>Horários (✈ ➔ 🏁)</th>
              <th className="text-center">Classe / Assento</th>
              <th className="text-center">Data</th>
            </tr>
          </thead>
          <tbody>
            {passagens.map((item, i) => (
              <tr key={i}>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Link href={"/passagem/" + i}>
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

                    {}
                    <Link href={"/ticket/" + i}>
                      <MdAirplaneTicket
                        title="Ver Ticket"
                        className="text-warning"
                        size={22}
                      />
                    </Link>
                  </div>
                </td>
                <td>{item.nome2}</td>
                <td>
                  <strong>{item.nome_id}</strong> <br />
                  <small className="text-muted">{item.companhia_aerea}</small>
                </td>
                <td>
                  {item.origem} ({item.sigla_origem}) <br />
                  <span className="text-info">➔</span> {item.destino} (
                  {item.sigla_destino})
                </td>
                <td>
                  {item.horario_embarque} <span className="text-info">➔</span>{" "}
                  {item.horario_chegada} <br />
                  <small>Portão: {item.portao}</small>
                </td>
                <td className="text-center">
                  <Badge bg="secondary" className="d-block mb-1">
                    {item.classe || item.nome}
                  </Badge>
                  <Badge bg="info" pill>
                    {item.assento}
                  </Badge>
                </td>
                <td className="text-center">{item.data}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {passagens.length === 0 && (
          <div className="text-center mt-4 text-muted">
            Nenhuma passagem emitida até o momento.
          </div>
        )}
      </Pagina>
    </>
  );
};

export default index;

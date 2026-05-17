import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaPlane } from "react-icons/fa";
import Pagina from "../../Components/Pagina";

const Ticket = () => {
  const { query } = useRouter();
  const [passagem, setPassagem] = useState(null);

  useEffect(() => {
    if (query.id) {
      const passagens =
        JSON.parse(window.localStorage.getItem("passagens")) || [];
      const dados = passagens[query.id];
      setPassagem(dados);
    }
  }, [query.id]);

  if (!passagem) {
    return (
      <Pagina titulo="Carregando Ticket...">
        <div className="text-center mt-5">
          Buscando informações do seu voo...
        </div>
      </Pagina>
    );
  }

  return (
    <div className="bodyTicket">
      <div className="boarding-pass">
        <div className="cardTicket card-top">
          <div className="source">
            <div className="code">{passagem.sigla_origem}</div>
            <div className="city">{passagem.origem}</div>
          </div>
          <div className="flight-median">
            <FaPlane />
          </div>
          <div className="destination">
            <div className="code">{passagem.sigla_destino}</div>
            <div className="city">{passagem.destino}</div>
          </div>
        </div>

        <div className="median"></div>

        <div className="cardTicket card-bottom">
          <div className="card-row">
            <div className="card-item">
              <span className="label">Passageiro</span>
              <p className="content">{passagem.nome2}</p>
            </div>
            <div className="card-item">
              <span className="label">Data</span>
              <p className="content">{passagem.data}</p>
            </div>
          </div>

          <div className="card-row">
            <div className="card-item">
              <span className="label">Voo</span>
              <p className="content">{passagem.nome_id}</p>
            </div>
            <div className="card-item">
              <span className="label">Portão</span>
              <p className="content">{passagem.portao || "B1"}</p>
            </div>
            <div className="card-item">
              <span className="label">Assento</span>
              <p
                className="content"
                style={{ color: "#00f3fc", fontWeight: "bold" }}
              >
                {passagem.assento}
              </p>
            </div>
            <div className="card-item">
              <span className="label">Classe</span>
              <p className="content">{passagem.classe}</p>
            </div>
          </div>

          <div className="card-row">
            <div className="card-item">
              <span className="label">Embarque</span>
              <p className="content">{passagem.horario_embarque}</p>
            </div>
            <div className="card-item">
              <span className="label">Chegada Prevista</span>
              <p className="content">{passagem.horario_chegada}</p>
            </div>
            <div className="card-item">
              <span className="label">Companhia</span>
              <p className="content">{passagem.companhia_aerea}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .label {
          font-size: 10px;
          text-transform: uppercase;
          color: #aaa;
        }
        .content {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Ticket;

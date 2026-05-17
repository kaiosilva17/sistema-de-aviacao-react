import React from 'react'
import { FaPlane } from "react-icons/fa";

const Ticket = () => {
  return (
    <div className="body">
                <div className="boarding-pass">
                    <div className="cardTicket card-top">
                        <div className="source">
                            <div className="code">IXM</div>
                            <div className="city">Madurai</div>
                        </div>
                        <div className="flight-median">
                            <FaPlane />
                        </div>
                        <div className="destination">
                            <div className="code">DXB</div>
                            <div className="city">Dubai</div>
                        </div>
                    </div>
                    <div className="median"></div>
                    <div className="cardTicket card-bottom">
                        <div className="card-row">
                            <div className="card-item">
                                <span className="label">Passageiro</span>
                                <p className="content">Kaio</p>
                            </div>
                            <div className="card-item">
                                <span className="label">Data</span>
                                <p className="content">24/06/2023</p>
                            </div>
                        </div>
                        <div className="card-row">
                            <div className="card-item">
                                <span className="label">Numero do Voo</span>
                                <p className="content">SG720</p>
                            </div>
                            <div className="card-item">
                                <span className="label">Portão</span>
                                <p className="content">B2</p>
                            </div>
                            <div className="card-item">
                                <span className="label">Assento</span>
                                <p className="content">4D</p>
                            </div>
                            <div className="card-item">
                                <span className="label">Classe</span>
                                <p className="content">Executiva</p>
                            </div>
                        </div>
                        <div className="card-row">
                            <div className="card-item">
                                <span className="label">Horário de embarque</span>
                                <p className="content">11:30</p>
                            </div>
                            <div className="card-item">
                                <span className="label">Tempo de viagem</span>
                                <p className="content">04:00</p>
                            </div>
                            <div className="card-item">
                                <span className="label">Horário de chegada</span>
                                <p className="content">15:30</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Ticket
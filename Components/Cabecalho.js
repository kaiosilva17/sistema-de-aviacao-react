import Link from 'next/link'
import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { PiAirplaneTakeoffFill } from "react-icons/pi"

const Cabecalho = ({ typeNavBar = "default" }) => {


  const navBars = {
    "default" : [

    ],


    "adm": [
      {
        text: "Aeronave",
        href: "/aeronave"
      },
      {
        text: "Aeroporto",
        href: "/aeroporto"
      },
      {
        text: "classe",
        href: "/classe"
      },
      {
        text: "voo",
        href: "/voo"
      }
    ],

    "usuario": [
      {
        text: "Cadastro",
        href: "/cadastro"
      },
      {
        text: "Passagem",
        href: "/passagem"
      }
    ]
  }

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand style={{ textShadow: '3px 4px 6px rgba(255, 255, 255, 0.6)', color: '#00F3FC' }} href="/"><PiAirplaneTakeoffFill style={{ color: '#FFFAFA' }} /> Decolando</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                navBars[typeNavBar].map(item => (
                <Nav.Link style={{ color: '#00F3FC' }} href={item.href}>{item.text}</Nav.Link>
              ))}
              {/*      <Nav.Link style={{ color: '#00F3FC' }} href="/classe">Classe</Nav.Link>
              <Nav.Link style={{ color: '#00F3FC' }} href="/cadastro">Cadastro</Nav.Link>
              <Nav.Link style={{ color: '#00F3FC' }} href="/aeroporto">Aeroporto</Nav.Link>
              <Nav.Link style={{ color: '#00F3FC' }} href="/passagem">Passagem</Nav.Link>
              <Nav.Link style={{ color: '#00F3FC' }} href="/aeronave">Aeronave</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Cabecalho
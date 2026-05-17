import React from 'react'
import Pagina from '../Components/Pagina'
import { Card, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap';
import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';
import  {BsFillPersonFill } from 'react-icons/bs'


export default function Home() {
  return (
    <>
      <Pagina>
        <Row>
          <Col md={5}>
          <Card bg='dark' border="info" >
          <Card.Img bg='dark'variant="top" src="https://png.pngtree.com/element_our/png/20181114/administration-flat-icon-png_238394.jpg" />
        <Card.Header style={{ color: '#FFC222', fontSize:'25px'}}>Area do Administrador</Card.Header>
        <Card.Body>
          
          <Card.Text style={{color: '#00f3fc'}}>
            Ao entrar na <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>area do ADM</b>, 4 tabelas deverão ser preenchidas: inicalmente a tabela <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'aeroporto'</b>, <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'aeronave'</b>,
            <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'classe'</b> e <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'voo'</b>, na qual as informações fornecidas serão usadas na area do cliente.
          </Card.Text>
          <Link className='col-md-3 btn btn-outline-warning' href="/aeronave">
                            <RiAdminFill className="me-2" />
                            Acessar
                        </Link>
        </Card.Body>
      </Card>
    </Col>
    <Col md={2}></Col>
    <Col md={5}>
    <Card bg='dark' border="info" >
          <Card.Img bg='dark'variant="top" src="https://thumbs.dreamstime.com/b/%C3%ADcone-de-perfil-usu%C3%A1rio-do-avatar-empregador-consultor-cliente-desenho-vetor-isolado-em-fundo-branco-utiliza%C3%A7%C3%A3o-para-fins-227600952.jpg" />
        <Card.Header style={{color: '#FFC222', fontSize:'25px'}}>Area do Cliente</Card.Header>
        <Card.Body>
          
          <Card.Text style={{color: '#00f3fc'}}>
            Ao entrar na <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>area do cliente</b>, 2 tabelas deverão ser preenchidas, inicialmente a tabela de <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'cadastro'</b>
            e posteriormente a tabela de <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'passagem'</b>, da qual o <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'ticket'</b> será gerado, podendo imprimi-lo em <b style={{color:'#FFC222',  textShadow: '2px 2px 4px rgba(255, 255, 255, 0.6)'}}>'PDF'</b>.
          </Card.Text>
          <Link className='col-md-3 btn btn-outline-warning' href="/cadastro">
                            <BsFillPersonFill className="me-2" />
                            Acessar
                        </Link>
        </Card.Body>
      </Card>
    </Col>
    </Row>
      </Pagina>

    </>
  )
}



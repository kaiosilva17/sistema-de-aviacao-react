import React from 'react'
import { Container } from 'react-bootstrap'
import Cabecalho from './Cabecalho'

const Pagina = (props) => {
    return (
        <>
            <Cabecalho typeNavBar={props.typeNavBar} />

            <div style={{background: '#00f3fc'}}className='py-4 text-center mb-5'>
                <h1 style={{color: '#4300d2'}}>{props.titulo}</h1>
            </div>
            <Container className='mb-5'>
                {props.children}
            </Container>
        </>
    )
}

export default Pagina
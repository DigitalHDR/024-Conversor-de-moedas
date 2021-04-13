import React, { useState } from 'react'
import './ConversorMoedas.css';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import ListarMoedas from './Listar-Moedas'

function ConversorMoedas() {

  const [valor, setValor] = useState('1')
  const [moedaDe, setmoedaDe] = useState('BRL')
  const [moedaPara, setmoedaPara] = useState('USD')

  function handleValor(event) {
    setValor(event.target.value.replace(/\D/g, ''))
  }

  function handleMoedaDe(event) {
    setmoedaDe(event.target.value)
  }

  function handleMoedaPara(event) {
    setmoedaPara(event.target.value)
  }

  return (
    <div>
      <h1>Conversor de Moedas</h1>
      <Alert variant="danger" show={false}>
        Erro obtendo dados de conversão, tente novamente!
      </Alert>
      <Jumbotron>
        <Form>
          <Form.Row>

            <Col sm="3">
              <Form.Control placeholder="0" value={valor} onChange={handleValor} required />
              {/* segunda maneira sem function e mais facil porem o replace não funciona aqui  */}
              {/* <Form.Control placeholder="0" value={valor} onChange={(e) => setValor(e.target.valeu)} required /> */}
              {/* end segunda maneira sem function e mais facil porem o replace não funciona aqui  */}
            </Col>

            <Col sm="3">
              <Form.Control as="select" value={moedaDe} onChange={handleMoedaDe} >
                {/* segunda maneira sem function e mais facil  */}
                {/* <Form.Control as="select" value={moedaDe} onChange={(e) => setmoedaDe(e.target.value)} > */}
                {/* end segunda maneira sem function e mais facil  */}
                <ListarMoedas />
              </Form.Control>
            </Col>

            <Col sm="1" className="text-center" style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>

            <Col sm="3">
              <Form.Control as="select" value={moedaPara} onChange={handleMoedaPara} >
              {/* segunda maneira sem function e mais facil  */}
              {/* <Form.Control as="select" value={moedaPara} onChange={(e) => setmoedaPara(e.target.value)} > */}
              {/* end segunda maneira sem function e mais facil  */}
                <ListarMoedas />
              </Form.Control>
            </Col>

            <Col sm="2">
              <Button variant="success" type="submit">
                <Spinner animation="border" size="sm" />
                  Converter
              </Button>
            </Col>

          </Form.Row>
        </Form>

        <Modal show={false}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Resultado da conversão aqui...
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" >
              Nova conversão
            </Button>
          </Modal.Footer>
        </Modal>

      </Jumbotron>
    </div>
  )
}

export default ConversorMoedas;
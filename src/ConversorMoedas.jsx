import React, { useState } from 'react'
import './ConversorMoedas.css';
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import ListarMoedas from './Listar-Moedas'
import axios from 'axios'

function ConversorMoedas() {

  const FIXER_URL = 'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3';

  const [valor, setValor] = useState('1')
  const [moedaDe, setMoedaDe] = useState('BRL')
  const [moedaPara, setMoedaPara] = useState('USD')
  const [exibirSpinner, setExibirSpinner] = useState(false)
  const [formValidado, setFormValidado] = useState(false)
  const [exibirModal, setExibirModal] = useState(false)
  const [resultadoConversao, setResultadoConversao] = useState('')

  function handleValor(event) {
    setValor(event.target.value.replace(/\D/g, ''))
  }

  function handleMoedaDe(event) {
    setMoedaDe(event.target.value)
  }

  function handleMoedaPara(event) {
    setMoedaPara(event.target.value)
  }

  function handleFecharModal(event) {
    setValor('1')
    setMoedaDe('BRL')
    setMoedaPara('USD')
    setFormValidado(false)
    setExibirModal(false)
  }

  // function para não atualizar a página
  function converter(event) {
    event.preventDefault()
    setFormValidado(true)
    if (event.currentTarget.checkValidity() === true) {
      setExibirSpinner(true)
      axios.get(FIXER_URL)
        .then(res => {
          const cotacao = obterCotacao(res.data)
        })
      
    }
  }
  // end function para não atualizar a página

  function obterCotacao(dadosCotacao) {
    if (!dadosCotacao || dadosCotacao.success !== true) {
      return false
    }
    const cotacaoDe = dadosCotacao.rates[moedaDe]
    const cotacaoPara = dadosCotacao.rates[moedaPara]
    const cotacao = (1 / cotacao * cotacaoPara) * valor
    return cotacao.toFixed(2)
  }



  return (
    <div>
      <h1>Conversor de Moedas</h1>
      <Alert variant="danger" show={false}>
        Erro obtendo dados de conversão, tente novamente!
      </Alert>
      <Jumbotron>
        <Form onSubmit={converter} noValidate validated={formValidado}>
        {/* metodo de envio onSubmit para não atualizar a página*/}
        {/*noValidate para não atualizar a página*/}
          <Form.Row>

            {/* valor */}
            <Col sm="3">
              <Form.Control placeholder="0" value={valor} onChange={handleValor} required />
              {/* segunda maneira sem function e mais facil porem o replace não funciona aqui  */}
              {/* <Form.Control placeholder="0" value={valor} onChange={(e) => setValor(e.target.valeu)} required /> */}
              {/* end segunda maneira sem function e mais facil porem o replace não funciona aqui  */}
            </Col>
            {/*end valor */}

            {/* moedaDe */}
            <Col sm="3">
              <Form.Control as="select" value={moedaDe} onChange={handleMoedaDe} >
                {/* segunda maneira sem function e mais facil  */}
                {/* <Form.Control as="select" value={moedaDe} onChange={(e) => setmoedaDe(e.target.value)} > */}
                {/* end segunda maneira sem function e mais facil  */}
                <ListarMoedas />
              </Form.Control>
            </Col>
            {/*end moedaDe */}

            {/* icon */}
            <Col sm="1" className="text-center" style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            {/*end  icon */}

            {/* moedaPara */}
            <Col sm="3">
              <Form.Control as="select" value={moedaPara} onChange={handleMoedaPara} >
                {/* segunda maneira sem function e mais facil  */}
                {/* <Form.Control as="select" value={moedaPara} onChange={(e) => setmoedaPara(e.target.value)} > */}
                {/* end segunda maneira sem function e mais facil  */}
                <ListarMoedas />
              </Form.Control>
            </Col>
            {/*end moedaPara */}

            {/* submit */}
            <Col sm="2">
              <Button variant="success" type="submit">
                <span className={exibirSpinner ? null : 'hidden'}>
                  {/* aqui o exibirSpinner NÃO vai aparecer caso estiver em false */}
                  {/* null e false é a mesma coisa */}
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={exibirSpinner ? 'hidden' : null}>
                  {/* aqui o exibirSpinner vai aparecer caso estiver em true */}
                  {/* null e false é a mesma coisa */}
                  Converter
                </span>
              </Button>
            </Col>
            {/*end submit */}

          </Form.Row>
        </Form>

        <Modal show={exibirModal} onHide={handleFecharModal}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {resultadoConversao}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleFecharModal}>
              Nova conversão
            </Button>
          </Modal.Footer>
        </Modal>

      </Jumbotron>
    </div>
  )
}

export default ConversorMoedas; 
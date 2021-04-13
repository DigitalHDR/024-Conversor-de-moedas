import { faItalic } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ReactDOM from 'react-dom'
import ListarMoedas from './Listar-Moedas'

describe('Teste do componente de listagem de moedas', () => {
    it('Deve renderizar o componente sem erros', () => {
        const div= document.createElement('div')
        ReactDOM.render(<ListarMoedas />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
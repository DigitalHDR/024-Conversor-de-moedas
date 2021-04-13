import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConversorMoedas from './/ConversorMoedas';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <ConversorMoedas />
  </React.StrictMode>
, document.getElementById('root'))
reportWebVitals();

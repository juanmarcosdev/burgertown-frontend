import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './routes/App';

const initialState = {
  'dataTrabajadores': [],
  'dataClientes': [],
  'dataCategorias': [],
  'dataSedes': [],
  'dataProductos': [],
  'dataMenu': [],
  'dataMenuProductos': [],
  'dataProductoIndividual': {},
  'carritoCompras': [],
  'idProductosALlevar': [],
  'cantidadProductosALlevar': [],
  'dataSedesDespliegue': [],
  'dataMediosPago': [],
  'dataDireccionCliente': '',
}

const store = createStore(reducer, initialState);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app'),
);

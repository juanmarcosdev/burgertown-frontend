import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import LoginAdmin from '../containers/LoginAdmin';
import LoginClient from '../containers/LoginClient';
import LoginChooser from '../containers/LoginChooser';
import RegistroCliente from '../containers/RegistroCliente/RegistroCliente';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/loginadmin' component={LoginAdmin} />
      <Route exact path='/logincliente' component={LoginClient} />
      <Route exact path='/loginchooser' component={LoginChooser} />
      <Route exact path='/registrocliente' component={RegistroCliente} />
    </Switch>
  </BrowserRouter>
);

export default App;

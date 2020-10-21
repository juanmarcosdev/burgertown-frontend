import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import LoginAdmin from '../containers/LoginAdmin';
import LoginClient from '../containers/LoginClient';
import LoginChooser from '../containers/LoginChooser';
import RegistroCliente from '../containers/RegistroCliente/RegistroCliente';
import Menu from '../containers/Menu/Menu';
import DashboardAdmin from '../containers/DashboardAdmin/DashboardAdmin';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/loginadmin' component={LoginAdmin} />
      <Route exact path='/logincliente' component={LoginClient} />
      <Route exact path='/loginchooser' component={LoginChooser} />
      <Route exact path='/registrocliente' component={RegistroCliente} />
      <Route exact path='/menu' component={Menu} />
      <Route exact path='/dashboardadmin' component={DashboardAdmin} />
    </Switch>
  </BrowserRouter>
);

export default App;

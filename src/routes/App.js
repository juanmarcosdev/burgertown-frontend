import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import LoginAdmin from '../containers/LoginAdmin';
import LoginClient from '../containers/LoginClient';
import LoginChooser from '../containers/LoginChooser';
import RegistroCliente from '../containers/RegistroCliente/RegistroCliente';
import Menu from '../containers/Menu/Menu';
import DashboardAdmin from '../containers/DashboardAdmin/DashboardAdmin';
import CreateWorker from '../containers/DashboardAdmin/CreateWorker';
import ModifyWorker from '../containers/DashboardAdmin/ModifyWorker';
import CreateClient from '../containers/DashboardAdmin/CreateClient';
import ModifyClient from '../containers/DashboardAdmin/ModifyClient';
import CreateCategory from '../containers/DashboardAdmin/CreateCategory';
import ModifyCategory from '../containers/DashboardAdmin/ModifyCategory';
import CreateSede from '../containers/DashboardAdmin/CreateSede';
import ModifySede from '../containers/DashboardAdmin/ModifySede';

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
      <Route exact path='/createworker' component={CreateWorker} />
      <Route path='/modifyworker/:workerId' component={ModifyWorker} />
      <Route exact path='/createclient' component={CreateClient} />
      <Route path='/modifyclient/:clientId' component={ModifyClient} />
      <Route exact path='/createcategory' component={CreateCategory} />
      <Route path='/modifycategory/:categoryId' component={ModifyCategory} />
      <Route exact path='/createsede' component={CreateSede} />
      <Route path='/modifysede/:sedeId' component={ModifySede} />
    </Switch>
  </BrowserRouter>
);

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home/Home';
import LoginAdmin from '../containers/LoginAdmin';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/loginadmin' component={LoginAdmin} />
    </Switch>
  </BrowserRouter>
);

export default App;

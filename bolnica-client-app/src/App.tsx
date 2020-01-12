import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UnosPacijenta from './components/UnosPacijenta';
import LoginDoktor from './components/LoginDoktor';
import NavigacionaTraka from './components/NavigacionaTraka';
import HomePage from './components/Home';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavigacionaTraka />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/unesiPacijenta" component={UnosPacijenta} />
          <Route exact path="/loginDoktor" component={LoginDoktor} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

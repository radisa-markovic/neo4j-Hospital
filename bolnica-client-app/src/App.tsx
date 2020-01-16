import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UnosPacijenta from './components/UnosPacijenta';
import LoginDoktor from './components/LoginDoktor';
import NavigacionaTraka from './components/NavigacionaTraka';
import HomePage from './components/Home';
import RegistracijaDoktor from './components/RegistracijaDoktor';
import UnosIzvestaja from './components/UnosIzvestaja';
import PacijentView from './components/PacijentView';
import ListaSaOdeljenjima from './components/ListaSaOdeljenjima';
import Odeljenje from './components/Odeljenje';
import Izvestaji from './components/Izvestaji';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <NavigacionaTraka />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/loginDoktor" component={LoginDoktor} />
          <Route exact path="/registracijaDoktor" component={RegistracijaDoktor} />
          <Route exact path="/Odeljenja" component={ListaSaOdeljenjima} />
          <Route exact path="/Odeljenja/:Naziv" component={Odeljenje} />
          <Route exact path="/Odeljenja/:Naziv/:IDPacijenta" component={Izvestaji}/>
          <Route exact path="/unesiPacijenta" component={UnosPacijenta} />
          <Route exact path="/unesiIzvestaj/:IDPacijenta" component={UnosIzvestaja} />
          <Route exact path="/pacijentView" component={PacijentView} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

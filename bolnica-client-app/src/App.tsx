import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UnosPacijenta from './components/UnosPacijenta';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UnosPacijenta} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

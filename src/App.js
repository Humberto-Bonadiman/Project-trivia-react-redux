import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';

import './App.css';

import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Configurations from './pages/Config';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
        <Switch>
          <Route path="/trivia" component={ Trivia } />
        </Switch>
        <Switch>
          <Route path="/configuration" component={ Configurations } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

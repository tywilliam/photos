import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import routes from '../../router/react';
import Store from '../../store';

import './style.scss';

const App = () => (
  <Provider store={Store}>
    <Switch>
      { routes.map(route => <Route {...route} key={route.name} />) }
    </Switch>
  </Provider>
);

export { App as default };

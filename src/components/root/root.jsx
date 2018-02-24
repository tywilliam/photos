import React from 'react';
import { Route, Switch } from 'react-router';

import routes from '../../router/react';

import './style.scss';

const Root = () => (
  <Switch>
    { routes.map(route => <Route {...route} key={route.name} />) }
  </Switch>
);

export { Root as default };

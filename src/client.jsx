import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Root } from './components';

hydrate((
  <BrowserRouter>
    <Root />
  </BrowserRouter>
), document.getElementById('root'));

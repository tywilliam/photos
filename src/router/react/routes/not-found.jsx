import React from 'react';

import { NotFound } from '../../../containers';

export default {
  exact: false,
  name: '404',
  path: '/',
  render: () => <NotFound />,
};

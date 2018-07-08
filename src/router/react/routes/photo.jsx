import React from 'react';

import { Photo } from '../../../containers';

export default {
  exact: false,
  name: 'photo',
  path: '/photo/:photoid',
  render: props => <Photo {...props} />,
};

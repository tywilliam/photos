import React from 'react';

import { Photo } from '../../../containers';

export default {
  render: props => <Photo {...props} />,
  exact: false,
  name: 'photo',
  path: '/photo/:photoid',
};

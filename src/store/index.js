import { createStore } from 'redux';

import ducks from '../ducks';

const store = createStore(
  ducks,
  typeof window !== 'undefined' && window.devToolsExtension && window.devToolsExtension(),
);

export { store as default };

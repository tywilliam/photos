// @flow

import * as React from 'react';
import styled from 'styled-components';


type Props = {
  className?: string,
}

const App = ({ className }: Props) => (
  <div className={className}>
    <p>Hello Isomorphic React!</p>
  </div>
);

export default styled(App)`
  p {
    text-align: center;
  }
`;

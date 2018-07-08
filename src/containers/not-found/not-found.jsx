import { NOT_FOUND } from 'http-status-codes';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import { StatusCode } from '../../components';

const NotFound = ({ className }) => (
  <StatusCode code={NOT_FOUND}>
    <p>The page your looking for doesn't exist</p>
  </StatusCode>
);

export default styled(NotFound)``;

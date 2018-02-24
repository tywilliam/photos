import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const App = ({ className }) => (
  <div className={className}>
    <p>Hello React server!</p>
  </div>
);

App.propTypes = {
  className: PropTypes.string,
};

App.defaultProps = {
  className: '',
};

export default styled(App)`
  p {
    text-align: center;
  }
`;

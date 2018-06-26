import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Picture } from '../../components';


const Home = ({ className }) => (
  <Fragment>
    <div className={className}>
      <Picture
        src="https://placeimg.com/1024/768/nature"
      />
      <Picture
        src="https://placeimg.com/1024/768/tech"
      />
      <Picture
        src="https://placeimg.com/1024/578/nature"
      />
      <Picture
        src="https://placeimg.com/1024/819/arch"
      />
      <Picture
        src="https://placeimg.com/1024/768/people"
      />
      <Picture
        src="https://placeimg.com/1024/480/nature"
      />
      <Picture
        src="https://placeimg.com/1024/768/animals"
      />
    </div>
  </Fragment>
);

export default styled(Home)`
  display: grid;
  grid-gap: 100px 20px;
  grid-template-columns: 20px 1fr 10fr 1fr 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;

  ${Picture} {
    grid-column-end: span 1;
    grid-column-start: 3;

    img {
      max-height: 75vh;
    }
  }
`;

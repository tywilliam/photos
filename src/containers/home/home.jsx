import React, { Fragment } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import { Picture } from '../../components';


const Home = ({ className }) => (
  <Fragment>
    <div className={className}>
      <a href="/photo/nature">
        <Picture src="https://placeimg.com/1024/768/nature" />
      </a>
      <a href="/photo/tech">
        <Picture src="https://placeimg.com/1024/768/tech" />
      </a>
      <a href="/photo/nature">
        <Picture src="https://placeimg.com/1024/578/nature" />
      </a>
      <a href="/photo/arch">
        <Picture src="https://placeimg.com/1024/819/arch" />
      </a>
      <a href="/photo/people">
        <Picture src="https://placeimg.com/1024/768/people" />
      </a>
      <a href="/photo/nature">
        <Picture src="https://placeimg.com/1024/480/nature" />
      </a>
      <a href="/photo/animals">
        <Picture src="https://placeimg.com/1024/768/animals" />
      </a>
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

  a {
    grid-column-end: span 1;
    grid-column-start: 3;

    img {
      max-height: 75vh;
    }
  }
`;

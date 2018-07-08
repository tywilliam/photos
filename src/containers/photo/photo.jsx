import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Picture } from '../../components';


const Photo = ({ className, match }) => (
  <Fragment>
    <div className={className}>
      <Picture src={`https://placeimg.com/1024/768/${match.params.photoid}`} />
    </div>
  </Fragment>
);

export default styled(Photo)``;

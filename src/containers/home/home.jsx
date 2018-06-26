import React, { Fragment } from 'react';
import styled from 'styled-components';

import { Picture } from '../../components';


const Home = ({ className }) => (
  <Fragment>
    <div className={className}>
      <Picture
        src="https://c1.staticflickr.com/9/8737/17005372806_2bb65167c9_c.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/5/4644/39490135182_c0f8a7ba1a_c.jpg"
      />
      <Picture
        src="https://photos.smugmug.com/Photography/i-KP65Cpc/0/b3edd025/X3/dramtic%20sand%20dunesJPG-X3.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/5/4314/35877456470_e10c785fd5_h.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/5/4323/36133212361_e0e2c3f2ed_c.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/9/8609/28214503334_4eab0102f1_c.jpg"
      />
      <Picture
        src="https://c2.staticflickr.com/8/7460/27392721831_ee67a49c7c_c.jpg"
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

import React from 'react';

import Picture from '../';
import Source from '../../source';


const name = 'Responsive - no art direction';

const story = () => (
  <Picture
    alt="This is alt text"
    src="https://placeimg.com/200/200/nature"
    title="This is a title"
  >
    <Source
      srcset="https://placeimg.com/400/400/nature 400w,
              https://placeimg.com/600/600/nature 600w,
              https://placeimg.com/800/800/nature 800w"
      type="image/jpeg"
    />
  </Picture>
);

export default {
  name,
  story,
};

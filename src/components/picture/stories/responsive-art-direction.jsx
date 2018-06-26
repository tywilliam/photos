import React from 'react';

import Picture from '../';
import Source from '../../source';


const name = 'Responsive - art direction';

const story = () => (
  <Picture
    alt="This is alt text"
    src="https://placeimg.com/200/200/nature"
    title="This is a title"
  >
    <Source
      media="(max-width: 599px)"
      srcset="https://placeimg.com/400/400/nature 400w,
              https://placeimg.com/600/600/nature 600w"
      type="image/jpeg"
    />
    <Source
      media="(min-width: 600px)"
      srcset="https://placeimg.com/700/300/people 700w,
              https://placeimg.com/900/100/people 900w"
      type="image/jpeg"
    />
  </Picture>
);

export default {
  name,
  story,
};

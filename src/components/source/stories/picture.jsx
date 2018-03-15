import React from 'react';

import Picture from '../../picture';
import Source from '../';


const name = 'Picture';

const story = () => (
  <Picture
    alt="This is alt text"
    src="https://c1.staticflickr.com/5/4705/26691259268_9123358b35_n.jpg"
    title="This is a title"
  >
    <Source
      media="(min-width: 800px)"
      sizes="80vw"
      srcset="https://c1.staticflickr.com/5/4705/26691259268_9123358b35_c.jpg"
      type="image/jpeg"
    />
  </Picture>
);

export default {
  name,
  story,
};

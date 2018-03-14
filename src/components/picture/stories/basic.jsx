import React from 'react';

import Picture from '../';


const name = 'Basic';

const story = () => (
  <Picture
    alt="This is alt text"
    src="https://c1.staticflickr.com/5/4705/26691259268_9123358b35_n.jpg"
    title="This is a title"
  />
);

export default {
  name,
  story,
};

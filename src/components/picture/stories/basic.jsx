import React from 'react';

import Picture from '../';


const name = 'Basic';

const story = () => (
  <Picture
    alt="This is alt text"
    src="https://placeimg.com/1920/1080/nature"
    title="This is a title"
  />
);

export default {
  name,
  story,
};

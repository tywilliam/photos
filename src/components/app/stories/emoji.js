import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import React from 'react';

const name = 'with emoji';

const story = () => (
  <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
);

export default {
  name,
  story,
};

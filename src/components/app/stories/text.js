import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import React from 'react';

const name = 'with text';

const story = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export default {
  name,
  story,
};

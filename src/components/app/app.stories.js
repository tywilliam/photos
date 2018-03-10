import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Welcome } from '@storybook/react/demo';
import React from 'react';

import stories from './stories';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

const buttonStories = storiesOf('Button', module);

stories.forEach(({ name, story }) => buttonStories.add(name, story));

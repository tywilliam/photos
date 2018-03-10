import { storiesOf } from '@storybook/react';

import stories from './stories';


const buttonStories = storiesOf('App', module);

stories.forEach(({ name, story }) => buttonStories.add(name, story));

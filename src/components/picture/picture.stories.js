import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import readme from './README.md';
import stories from './stories';

const buttonStories = storiesOf('Picture', module);

buttonStories.addDecorator(withReadme(readme));

stories.forEach(({ name, story }) => buttonStories.add(name, story));

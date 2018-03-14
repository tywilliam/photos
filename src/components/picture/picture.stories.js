import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import readme from './README.md';
import stories from './stories';


const componentStories = storiesOf('Picture', module);

componentStories.addDecorator(withReadme(readme));

stories.forEach(({ name, story }) => componentStories.add(name, story));

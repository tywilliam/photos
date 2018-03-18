import * as React from 'react';
import renderer from 'react-test-renderer';

import Picture from './';

describe('Picture', () => {
  test('It renders', () => {
    const component = renderer.create(
      <Picture />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

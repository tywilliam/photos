import Enzyme, { render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import Picture from './';
import Source from '../source';

Enzyme.configure({ adapter: new Adapter() });

describe('<Picture />', () => {
  xit('always renders a picture', () => {
    const wrapper = render(<Picture />);
    expect(wrapper.find('picture')).toHaveLength(1);
  });

  it('always renders one <img /> tag', () => {
    const wrapper = render(<Picture />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  xit('only renders <Source /> as children', () => {
    // const wrapper = shallow((
    //   <Picture>
    //     <div className="unique" />
    //   </Picture>
    // ));

    const wrapper = shallow((
      <Picture>
        <Source />
      </Picture>
    ));

    // expect(pictureWithInvalidChild.contains(<div className="unique" />)).toBeFalsy();
    expect(wrapper.find(Source)).toHaveLength(1);
  });
});

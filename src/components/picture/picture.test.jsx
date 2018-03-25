/* global render:false, shallow:false */

import * as React from 'react';

import Picture from './';
import Source from '../source';


describe('<Picture />', () => {
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

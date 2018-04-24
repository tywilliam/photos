import React, { Fragment } from 'react';

import { Picture } from '../../components';


const Home = () => (
  <Fragment>
    <h1>Home</h1>
    <div>
      <Picture
        src="https://c1.staticflickr.com/9/8737/17005372806_2bb65167c9_c.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/5/4323/36133212361_e0e2c3f2ed_c.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/5/4644/39490135182_c0f8a7ba1a_c.jpg"
      />
      <Picture
        src="https://c1.staticflickr.com/9/8609/28214503334_4eab0102f1_c.jpg"
      />
      <Picture
        src="https://c2.staticflickr.com/8/7460/27392721831_ee67a49c7c_c.jpg"
      />
    </div>
  </Fragment>
);

export { Home as default };

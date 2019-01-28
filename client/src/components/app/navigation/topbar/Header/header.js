import React from 'react';
import LeftNav from '../LeftNav/leftNav.js';
import RightNav from '../RightNav/rightNav.js';
import { dashNavContainer } from './header.scss';

export default props => (
  <div className={dashNavContainer}>
    <LeftNav {...props} />
    <RightNav />
  </div>
);

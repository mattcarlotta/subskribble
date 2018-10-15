import React from 'react';
import LeftNav from '../LeftNav/leftNav';
import RightNav from '../RightNav/rightNav';
import { dashNavContainer } from './header.scss';

export default props => (
  <div className={dashNavContainer}>
    <LeftNav {...props} />
    <RightNav />
  </div>
);

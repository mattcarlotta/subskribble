import React from 'react';
import LeftNav from 'components/app/navigation/topbar/LeftNav/leftNav.js';
import RightNav from 'components/app/navigation/topbar/RightNav/rightNav.js';
import { dashNavContainer } from './header.scss';

export default props => (
  <div className={dashNavContainer}>
    <LeftNav {...props} />
    <RightNav />
  </div>
);

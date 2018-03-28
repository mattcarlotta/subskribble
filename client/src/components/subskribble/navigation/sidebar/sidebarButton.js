import React from 'react';
import NavButton from '../navButton';

export default ({ collapseSideNav, handleMenuToggle }) => (
  <NavButton
    icon={collapseSideNav ? 'keyboard_arrow_left' : 'keyboard_arrow_right'}
    onClickAction={handleMenuToggle}
  />
)

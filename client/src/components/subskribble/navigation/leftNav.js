import React from 'react';
import NavButton from './navButton';

export default ({ collapseSideNav, handleMenuToggle }) => (
  <div className="left-nav">
    <NavButton
      icon={collapseSideNav ? "menu" : "format_indent_decrease"}
      onClickAction={handleMenuToggle}
      tooltip={collapseSideNav ? "Open Menu" : "Close Menu"}
    />
  </div>
);

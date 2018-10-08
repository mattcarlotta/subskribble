import React from 'react';
import PropTypes from 'prop-types';
import NavButton from './navButton';

const LeftNav = ({ collapseSideNav, handleMenuToggle }) => (
  <div className="left-nav">
    <NavButton
      className="menu-collapse"
      icon={collapseSideNav ? 'menu' : 'format_indent_decrease'}
      onClickAction={handleMenuToggle}
      tooltip={collapseSideNav ? 'Open Menu' : 'Close Menu'}
    />
  </div>
);

export default LeftNav;

LeftNav.propTypes = {
  collapseSideNav: PropTypes.bool.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
};

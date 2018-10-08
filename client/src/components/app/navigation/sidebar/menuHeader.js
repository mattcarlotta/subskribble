import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const MenuHeader = ({ collapseSideNav, handleLogoClick }) => (
  <div key="menu-header" className="sider-menu-header">
    <Button onClick={handleLogoClick} className="logo-container">
      <i className="material-icons icon-logo">wifi_tethering</i>
      <span
        style={{ display: collapseSideNav ? 'none' : '' }}
        className="text-logo"
      >
        subskribble
      </span>
    </Button>
  </div>
);

export default MenuHeader;

MenuHeader.propTypes = {
  collapseSideNav: PropTypes.bool.isRequired,
  handleLogoClick: PropTypes.func.isRequired,
};

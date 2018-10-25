import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './sidebar.scss';

const MenuHeader = ({ collapseSideNav, handleLogoClick }) => (
  <div key="menu-header" className={styles.siderMenuHeader}>
    <Button onClick={handleLogoClick} className={styles.siderLogoContainer}>
      <i className={`${styles.materialIcons} ${styles.iconLogo}`}>
        wifi_tethering
      </i>
      <span
        style={{ display: collapseSideNav ? 'none' : '' }}
        className={styles.textLogo}
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

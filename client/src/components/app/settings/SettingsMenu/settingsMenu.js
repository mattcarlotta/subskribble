import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { Avatar, Menu } from 'antd';
import styles from './settingsMenu.scss';

const { Item: MenuItem } = Menu;
const RIGHTNAVLINKS = [
  // { icon: 'person_outline', label: 'My Profile', link: '/subskribble/profile' },
  // { icon: 'mail_outline', label: 'Messages', link: '/subskribble/messages' },
  { icon: 'settings', label: 'Settings', link: '/subskribble/settings' },
  // { icon: '', label: '', link: '/subskribble/logout' },
];

const SettingsMenu = ({
  avatarURL,
  firstName,
  handleVisibleChange,
  lastName,
  loggedinUser,
  unauthorizeUser,
}) => {
  const closeMenu = () => handleVisibleChange(false);
  return (
    <Menu className={styles.settingsTabContainer} selectedKeys={[]}>
      <MenuItem className={styles.headerContainer}>
        <div className={styles.myProfileContainer}>
          <Avatar className={styles.popoverUser} icon="user" src={avatarURL} />
          <div className={styles.userLabel}>
            <p className={styles.user}>
              {firstName} {lastName}
            </p>
            <p className={styles.email}>{loggedinUser}</p>
          </div>
        </div>
      </MenuItem>
      {map(RIGHTNAVLINKS, ({ icon, label, link }, key) => (
        <MenuItem className={styles.linkContainer} key={key}>
          <Link onClick={closeMenu} className={styles.menuOptions} to={link}>
            <i className={`${styles.materialIcons} ${styles.settingsIcon}`}>
              {icon}
            </i>
            <span className={styles.settingsLabel}>{label}</span>
          </Link>
        </MenuItem>
      ))}
      <MenuItem className={styles.linkContainer}>
        <Link className={styles.menuOptions} onClick={unauthorizeUser}>
          <i className={`${styles.materialIcons} ${styles.settingsIcon}`}>
            exit_to_app
          </i>
          <span className={styles.settingsLabel}>Logout</span>
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default SettingsMenu;

SettingsMenu.propTypes = {
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  loggedinUser: PropTypes.string,
  handleVisibleChange: PropTypes.func.isRequired,
  unauthorizeUser: PropTypes.func.isRequired,
};

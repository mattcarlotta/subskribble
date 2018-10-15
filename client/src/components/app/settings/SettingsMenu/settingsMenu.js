import map from 'lodash/map';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';
import { Avatar, Menu } from 'antd';

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
    <Menu className="settings-tab-container" selectedKeys={[]}>
      <MenuItem style={{ height: 65 }}>
        <div className="my-profile-container">
          <Avatar className="popover-user" icon="user" src={avatarURL} />
          <div className="user-label">
            <p className="user">
              {firstName} {lastName}
            </p>
            <p className="email">{loggedinUser}</p>
          </div>
        </div>
      </MenuItem>
      {map(RIGHTNAVLINKS, ({ icon, label, link }, key) => (
        <MenuItem key={key}>
          <Link onClick={closeMenu} className="menu-options" to={link}>
            <i className="material-icons settings-icon">{icon}</i>
            <span className="settings-label">{label}</span>
          </Link>
        </MenuItem>
      ))}
      <MenuItem>
        <Link className="menu-options" onClick={unauthorizeUser}>
          <i className="material-icons settings-icon">exit_to_app</i>
          <span className="settings-label">Logout</span>
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

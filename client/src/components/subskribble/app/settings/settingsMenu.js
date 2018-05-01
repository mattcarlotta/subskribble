import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Avatar, Menu } from 'antd';
const { Item: MenuItem } = Menu;

const RIGHTNAVLINKS = [
  // { icon: 'person_outline', label: 'My Profile', link: '/subskribble/profile' },
  { icon: 'mail_outline', label: 'Messages', link: '/subskribble/messages' },
  { icon: 'settings', label: 'Settings', link: '/subskribble/settings' },
]

export default () => (
  <Menu className="settings-tab-container">
    <MenuItem style={{ height: 65 }}>
      <Link className="my-profile-container" to="/subskribble/profile">
        <Avatar className="popover-user" icon="user" />
        <div className="settings-label">
          <p className="user">Matt Carlotta</p>
          <p className="email">carlotta.matt@gmail.com</p>
        </div>
      </Link>
    </MenuItem>
    {map(RIGHTNAVLINKS, ({ icon, label, link }, key) => (
      <MenuItem key={key} >
        <Link className="menu-options" to={link}>
          <i className="material-icons settings-icon">{icon}</i>
          <span className="settings-label">{label}</span>
        </Link>
      </MenuItem>
    ))}
  </Menu>
)

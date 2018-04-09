import map from 'lodash/map';
import React from 'react';
import RIGHTNAVLINKS from '../links/rightNavLinks';
import { Link } from 'react-router';
import { Menu } from 'antd';
const { Item: MenuItem } = Menu;

export default () => (
  <Menu className="settings-tab-container">
    <MenuItem style={{ height: 65 }}>
      <Link className="my-profile-container" to="/subskribble/profile">
        <i className="material-icons">person_outline</i>
        <div className="settings-label">
          <p>Matt Carlotta</p>
          <p className="">carlotta.matt@gmail.com</p>
        </div>
      </Link>
    </MenuItem>
    {map(RIGHTNAVLINKS, ({ icon, label, link }, key) => (
      <MenuItem key={key} >
        <Link to={link}>
          <i className="material-icons settings-icon">{icon}</i>
          <span className="settings-label">{label}</span>
        </Link>
      </MenuItem>
    ))}
  </Menu>
)

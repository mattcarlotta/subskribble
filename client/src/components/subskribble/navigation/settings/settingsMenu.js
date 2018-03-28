import map from 'lodash/map';
import React from 'react';
import RIGHTNAVLINKS from '../links/rightNavLinks';
import { Link } from 'react-router';
import { Menu } from 'antd';
const { Item: MenuItem } = Menu;

export default () => (
  <Menu className="settings-tab-container">
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

import map from 'lodash/map';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown } from 'antd';
import RIGHTNAVLINKS from '../links/rightNavLinks';
const { Item: MenuItem } = Menu;

class SettingsButton extends Component {
  render() {
    return (
      <div className="settings-tab">
        <Dropdown
          placement="bottomRight"
          overlay={
            <Menu style={{ width: 150 }}>
              {map(RIGHTNAVLINKS, ({ icon, label, link }, key) => (
                <MenuItem key={key} >
                  <Link to={link}>
                    <i className="material-icons m-r-15">{icon}</i>
                    <span style={{ position: 'relative', top: '-5px' }}>{label}</span>
                  </Link>
                </MenuItem>
              ))}
              </Menu>
            }
            trigger={['click']}
            >
              <i className="material-icons settings-icon">settings</i>
          </Dropdown>
      </div>
    )
  }
}

export default SettingsButton;

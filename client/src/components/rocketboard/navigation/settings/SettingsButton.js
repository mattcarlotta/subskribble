import map from 'lodash/map';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Popover } from 'antd';
import RIGHTNAVLINKS from '../links/rightNavLinks';
const { Item: MenuItem } = Menu;

class SettingsButton extends Component {
  state = { visibleSettings: false }

  handleVisibleChange = (visible) => this.setState({ visibleSettings: visible });

  render() {
    return (
      <div className="settings-tab">
        <Popover
          arrowPointAtCenter
          content={
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
          }
          onVisibleChange={this.handleVisibleChange}
          placement="bottomRight"
          trigger="click"
          visible={this.state.visibleSettings}
        >
            <i className="material-icons settings-icon">settings</i>
        </Popover>
      </div>
    )
  }
}

export default SettingsButton;

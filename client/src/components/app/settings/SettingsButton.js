import React, { PureComponent } from 'react';
import { Avatar, Button, Popover, Tooltip } from 'antd';
import SettingsMenu from './settingsMenu';

class SettingsButton extends PureComponent {
  state = { visibleSettings: false, tipVisible: false };

  handleVisibleChange = visible => this.setState({ visibleSettings: visible });
  showVisible = () => this.setState({ visibleSettings: true });
  unauthorizeUser = () => this.props.logoutUser();
  preventButtonFocus = e => e.target.blur();

  render = () => (
    <div className="settings-tab">
      <Tooltip
        arrowPointAtCenter
        placement="bottom"
        title="My Account"
        overlayClassName="tooltip-placement"
        overlayStyle={{ display: this.state.visibleSettings ? 'none' : '' }}
      >
        <Popover
          arrowPointAtCenter
          content={
            <SettingsMenu
              {...this.props}
              handleVisibleChange={this.handleVisibleChange}
              unauthorizeUser={this.unauthorizeUser}
            />
          }
          onVisibleChange={this.handleVisibleChange}
          placement="bottomRight"
          trigger="click"
          visible={this.state.visibleSettings}
          overlayClassName="settings-adjust-tooltip"
        >
          <Button className="setting-button" onFocus={this.preventButtonFocus}>
            <Avatar
              className="settings-icon user-icon"
              size="medium"
              src={this.props.avatarURL}
              icon="user"
              style={{
                backgroundColor: !this.props.avatarURL ? '#1890ff' : null,
              }}
            />
            <span className="current-user">
              {this.props.firstName} {this.props.lastName}
            </span>
          </Button>
        </Popover>
      </Tooltip>
    </div>
  );
}

export default SettingsButton;

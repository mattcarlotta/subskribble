import React, { PureComponent } from 'react';
import { Avatar, Button, Popover, Tooltip } from 'antd';
import SettingsMenu from '../SettingsMenu/settingsMenu.js';
import styles from './SettingsButton.scss';

class SettingsButton extends PureComponent {
  state = { visibleSettings: false };

  handleVisibleChange = visible => this.setState({ visibleSettings: visible });

  unauthorizeUser = () => this.props.logoutUser();

  handlePreventButtonFocus = e => e.target.blur();

  render = () => (
    <div className={styles.settingsTab}>
      <Tooltip
        arrowPointAtCenter
        placement="bottom"
        title="My Account"
        overlayClassName={styles.tooltipPlacement}
        overlayStyle={{ display: this.state.visibleSettings ? 'none' : '' }}
      >
        {/* eslint-disable */}
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
          overlayClassName={styles.settingsAdjustTooltip}
        >
          {/* eslint-enable */}
          <Button
            className={styles.settingButton}
            onFocus={this.handlePreventButtonFocus}
          >
            <Avatar
              className={styles.settingsIcon}
              size="medium"
              src={this.props.avatarURL}
              icon="user"
              style={{
                backgroundColor: !this.props.avatarURL ? '#1890ff' : null,
              }}
            />
            <span className={styles.currentUser}>
              {this.props.firstName} {this.props.lastName}
            </span>
          </Button>
        </Popover>
      </Tooltip>
    </div>
  );
}

export default SettingsButton;

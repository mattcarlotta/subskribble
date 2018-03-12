import React, { PureComponent } from 'react';
import { Popover } from 'antd';
import SettingsMenu from './settingsMenu';

class SettingsButton extends PureComponent {
  state = { visibleSettings: false }

  handleVisibleChange = visible => this.setState({ visibleSettings: visible });

  render = () => (
    <div className="settings-tab">
      <Popover
        arrowPointAtCenter
        content={<SettingsMenu />}
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

export default SettingsButton;

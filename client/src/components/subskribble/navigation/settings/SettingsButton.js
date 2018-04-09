import React, { PureComponent } from 'react';
import { Popover, Tooltip } from 'antd';
import SettingsMenu from './settingsMenu';

export default class SettingsButton extends PureComponent {
	state = { visibleSettings: false, tipVisible: false };

	handleVisibleChange = visible => this.setState({ visibleSettings: visible });

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
					className="nav-button"
					content={<SettingsMenu />}
					onVisibleChange={this.handleVisibleChange}
					placement="bottomRight"
					trigger="click"
					visible={this.state.visibleSettings}
        >
					<i className="material-icons settings-icon">account_circle</i>
				</Popover>
			</Tooltip>
		</div>
	);
}

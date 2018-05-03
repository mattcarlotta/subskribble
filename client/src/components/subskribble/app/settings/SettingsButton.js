import React, { PureComponent } from 'react';
import { Avatar, Popover, Tooltip } from 'antd';
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
					content={<SettingsMenu {...this.props}/>}
					onVisibleChange={this.handleVisibleChange}
					placement="bottomRight"
					trigger="click"
					visible={this.state.visibleSettings}
        >
					<Avatar className="settings-icon user-icon" size="small" icon="user" />
				</Popover>
			</Tooltip>
		</div>
	);
}

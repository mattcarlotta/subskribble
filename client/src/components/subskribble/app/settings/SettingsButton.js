import React, { PureComponent } from 'react';
import { Avatar, Popover, Tooltip } from 'antd';
import SettingsMenu from './settingsMenu';

class SettingsButton extends PureComponent {
	state = { visibleSettings: false, tipVisible: false };

	handleVisibleChange = visible => this.setState({ visibleSettings: visible });

	unauthorizeUser = () => this.props.logoutUser();

	render = () => (
		<span className="settings-tab">
			<Tooltip
				arrowPointAtCenter
				placement="bottom"
				title="My Account"
				overlayClassName="tooltip-placement"
				overlayStyle={{ display: this.state.visibleSettings ? 'none' : '' }}
			>
				<Popover
					arrowPointAtCenter
					content={<SettingsMenu handleVisibleChange={this.handleVisibleChange} unauthorizeUser={this.unauthorizeUser} {...this.props}/>}
					onVisibleChange={this.handleVisibleChange}
					placement="bottomRight"
					trigger="click"
					visible={this.state.visibleSettings}
					overlayClassName="settings-adjust-tooltip"
				>
					<Avatar
						className="settings-icon user-icon"
						size="small"
						src={this.props.avatarURL}
						icon="user"
						style={{ backgroundColor: !this.props.avatarURL ? "#1890ff" : null }}
					/>
					<span className="current-user">{this.props.firstName} {this.props.lastName}</span>
				</Popover>
			</Tooltip>
		</span>
	);
}

export default SettingsButton;

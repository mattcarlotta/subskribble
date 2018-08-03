import React, { Component } from 'react';
import { Badge, Popover, Tooltip } from 'antd';

import PopoverContent from './popoverContent';

export default class Notifications extends Component {
	state = { visibleNotifications: false };

	handleClearNotes = () => this.props.removeAllNotifications();

	handleDeleteNote = (e) => {
		const note = e.target.dataset.id;
		this.props.deleteNotification(note);
	}

	handleVisibleChange = visible => {
		this.setState({ visibleNotifications: visible }, () => {
			const { visibleNotifications } = this.state;
			const { unreadNotifications, updateNotifications } = this.props;

			(!visibleNotifications && unreadNotifications) && updateNotifications();
		});
	}

	handleNotificationAsRead = e => {
		const note = e.target.dataset.id;
		this.props.updateNotifications(note);
	}

	render() {
		const { visibleNotifications } = this.state;
		const { unreadNotifications, readNotifications } = this.props;

		return(
			<span className="notifications-container">
				<Tooltip
					arrowPointAtCenter
					placement="bottom"
					title="Notifications"
					overlayClassName="tooltip-placement"
					overlayStyle={{ display: visibleNotifications ? 'none' : '' }}
				>
					<Badge
						count={unreadNotifications ? unreadNotifications.length : 0}
						offset={[3,-5]}
						showZero={false}
						overflowCount={99}
					>
						<Popover
							arrowPointAtCenter
							content={
								<PopoverContent
									handleClearNotes={this.handleClearNotes}
									handleDeleteNote={this.handleDeleteNote}
									unreadNotifications={unreadNotifications}
									readNotifications={readNotifications}
								/>
							}
							placement="bottomRight"
							trigger="click"
							visible={visibleNotifications}
							onVisibleChange={this.handleVisibleChange}
						>
							<i className="material-icons notifications-icon">notifications</i>
						</Popover>
					</Badge>
				</Tooltip>
			</span>
		)
	}
}

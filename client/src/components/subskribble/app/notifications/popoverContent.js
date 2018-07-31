import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Button } from 'antd';
import NotificationBody from './notificationBody';
import NotificationEmpty from './notificationEmpty';

export default ({ handleClearNotes, handleDeleteNote, readNotifications, unreadNotifications }) => (
	<div className="notifications-popover">
		<div className="notifications-header">
			<div>Notifications</div>
		</div>
		<hr className="divider" />
		{ isEmpty(unreadNotifications) && isEmpty(readNotifications)
			? <NotificationEmpty />
			: <NotificationBody
					handleDeleteNote={handleDeleteNote}
					notifications={[...unreadNotifications || [], ...readNotifications || []]}
				/>
		}
		<hr className="divider" />
		<div className="notifications-footer">
			<Button onClick={handleClearNotes} className="clear-notifications">Clear Notifications</Button>
		</div>
	</div>
)

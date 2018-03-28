import React from 'react';

// import NotificationsButton from '../app/notifications/NotificationButton';
import Notifications from '../../../containers/subskribble/app/notifications/Notifications';
import SettingsButton from './settings/SettingsButton';

export default () => (
	<div className="right-nav">
		<Notifications />
		<SettingsButton />
	</div>
);

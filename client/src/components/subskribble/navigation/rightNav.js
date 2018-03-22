import React from 'react';

import NotificationsButton from './notifications/NotificationButton';
import SettingsButton from './settings/SettingsButton';

export default () => (
	<div className="right-nav">
		<NotificationsButton />
		<SettingsButton />
	</div>
);

import React from 'react';

import NotificationsButton from './notifications/NotificationButton';
import SettingsButton from './settings/SettingsButton';

const Header = () => (
	<div className="right-nav">
		<NotificationsButton />
		<SettingsButton />
	</div>
);

export default Header;

/*
<CustomerAvatar />
<b className="loggedin-user">carlotta.matt@gmail.com</b>
<NotificationsButton />
import CustomerAvatar from './avatar/customerAvatar';

*/

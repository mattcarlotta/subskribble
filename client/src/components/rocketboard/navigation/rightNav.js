import React from 'react';

// import CustomerAvatar from './avatar/customerAvatar';
import NotificationsButton from './notifications/NotificationButton';
import SettingsButton from './settings/SettingsButton';

const Header = () => {
	return (
		<div className="right-nav">
			{/* <CustomerAvatar /> */}
			{/* <b className="loggedin-user">carlotta.matt@gmail.com</b> */}
			<NotificationsButton />
			<SettingsButton />
		</div>
	);
};

export default Header;

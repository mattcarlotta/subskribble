import React from 'react';

import Notifications from '../../../containers/subskribble/app/notifications/Notifications';
import LoggedinSettings from '../../../containers/subskribble/app/authentication/LoggedinSettings';

export default () => (
	<div className="right-nav">
		<Notifications />
		<LoggedinSettings />
	</div>
);

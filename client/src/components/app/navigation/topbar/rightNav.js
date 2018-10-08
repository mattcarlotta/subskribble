import React from 'react';

import Notifications from '../../../../containers/app/notifications/Notifications';
import LoggedinSettings from '../../../../containers/app/auth/LoggedinSettings';

export default () => (
  <div className="right-nav">
    <Notifications />
    <LoggedinSettings />
  </div>
);

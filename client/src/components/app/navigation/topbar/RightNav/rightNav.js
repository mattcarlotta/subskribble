import React from 'react';
import Notifications from 'containers/app/notifications/Notifications';
import LoggedinSettings from 'containers/app/auth/LoggedinSettings/LoggedinSettings';
import { rightNav } from './rightNav.scss';

export default () => (
  <div className={rightNav}>
    <Notifications />
    <LoggedinSettings />
  </div>
);

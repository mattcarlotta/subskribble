import React from 'react';

import RocketLogo from '../../../../images/logos/rocketbiller_logo_notification.png';

export default function() {
  return (
    <div className="notifications-empty">
      <img className="empty-notes" src={RocketLogo} alt="rocketbiller_logo_notification.png" />
      <p className="empty-title">No new notifications. You're all caught up!</p>
    </div>
  )
}

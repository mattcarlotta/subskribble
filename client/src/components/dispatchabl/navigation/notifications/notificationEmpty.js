import React from 'react';

import DispatchablLogo from '../../../../images/logos/dispatchabl_text_logo.png';

export default function() {
  return (
    <div className="notifications-empty">
      <img className="empty-notes" src={DispatchablLogo} alt="dispatchabl_text_logo.png" />
      <p className="empty-title">No new notifications. You're all caught up!</p>
    </div>
  )
}

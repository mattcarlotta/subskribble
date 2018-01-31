import React from 'react';
import { Link } from 'react-router';

import dispatchablTextLogo from '../../../images/logos/dispatchabl_text_logo.png';

export default function() {
  return (
    <div className="logo-container">
      <Link to='/rocketboard/dashboard'>
        <i className="material-icons icon-logo">wifi_tethering</i>
        <img className="text-logo" src={dispatchablTextLogo} alt="dispatchabl_text_logo.png" />
      </Link>
    </div>
  )
}

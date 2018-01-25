import React from 'react';
import { Link } from 'react-router';

import rbSymbolLogo from '../../../images/logos/rocketbiller_logo_60x60.png';
import rbTextLogo from '../../../images/logos/rocketbiller_logo_text.png';

export default function() {
  return (
    <div className="logo-container">
      <Link to='/rocketboard/dashboard'>
        <span>
          <img src={rbSymbolLogo} alt="rocketbiller_logo_60x60.png" />
          <img className="text-logo" src={rbTextLogo} alt="rocketbiller_logo_text.png" />
        </span>
      </Link>
    </div>
  )
}

import React from 'react';
import { Link } from 'react-router';

export default function() {
  return (
    <div className="logo-container">
      <Link to='/rocketboard/dashboard'>
        <i className="material-icons icon-logo">wifi_tethering</i>
        <span className="text-logo">subskribble</span>
      </Link>
    </div>
  )
}

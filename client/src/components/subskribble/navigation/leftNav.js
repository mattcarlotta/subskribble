import React from 'react';
import { Link } from 'react-router';

export default ({onClickAction}) => (
  <div onClick={onClickAction} className="logo-container">
    <Link to='/subskribble'>
      <i className="material-icons icon-logo">wifi_tethering</i>
      <span className="text-logo">subskribble</span>
    </Link>
  </div>
)

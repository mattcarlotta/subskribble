import React from 'react';
import { Link } from 'react-router';

export default ({ collapseSideNav, onClickAction }) => (
  <div onClick={onClickAction} className="logo-container">
    <Link to='/subskribble'>
      <i className="material-icons icon-logo">wifi_tethering</i>
      <span style={{ display: collapseSideNav ? 'none' : '' }} className="text-logo">subskribble</span>
    </Link>
  </div>
)

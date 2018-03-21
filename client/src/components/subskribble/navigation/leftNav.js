import React from 'react';
import { Button } from 'antd';

export default ({ collapseSideNav, onClickAction }) => (
  <Button onClick={onClickAction} className="logo-container">
      <i className="material-icons icon-logo">wifi_tethering</i>
      <span style={{ display: collapseSideNav ? 'none' : '' }} className="text-logo">subskribble</span>
  </Button>
)

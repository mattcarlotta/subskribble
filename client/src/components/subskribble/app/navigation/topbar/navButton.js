import React from 'react';
import { browserHistory } from 'react-router';
import { Button, Tooltip } from 'antd';

export default ({ className, icon, link, onClickAction, tooltip }) => (
  <Tooltip
    arrowPointAtCenter
    placement="bottom"
    title={tooltip}
  >
    <Button
      className={`nav-button ${className}`}
      onClick={ onClickAction ? onClickAction : () => browserHistory.push(`/subskribble/${link}`)}
    >
      <i className="material-icons nav-button-icon">{icon}</i>
    </Button>
  </Tooltip>
)
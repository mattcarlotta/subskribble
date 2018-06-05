import React from 'react';
import { Button, Tooltip } from 'antd';
import { browserHistory } from 'react-router';

export default ({ buttonIcon, buttonPushLocation, className, onClickAction, tipTitle }) => {
  const pushToLocation = () => browserHistory.push(`/subskribble/${buttonPushLocation}`);
  return (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      trigger="hover"
      title={tipTitle}
      >
        <Button
          className={`btn-primary ${className}`}
          onClick={onClickAction || pushToLocation}
          >
            <i className="material-icons adjust-position">{buttonIcon}</i>
        </Button>
    </Tooltip>
  )
}

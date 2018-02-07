import React from 'react';
import { Button, Tooltip } from 'antd';

export default function({ className, icon, iconClassName, onClickAction, tooltip }) {
  return (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      title={tooltip}
      >
        <Button
          className={className}
          onClick={onClickAction}
        >
          <i className={`material-icons ${iconClassName}`}>{icon}</i>
        </Button>
    </Tooltip>
  )
}

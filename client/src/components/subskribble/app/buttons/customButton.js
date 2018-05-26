import React from 'react';
import { Button, Tooltip } from 'antd';

export default ({ buttonIcon, className, onClickAction, tipTitle }) => (
  <Tooltip
    arrowPointAtCenter
    placement="bottom"
    trigger="hover"
    title={tipTitle}
  >
    <Button
      className={`btn-primary ${className}`}
      onClick={onClickAction}
      >
        <i className="material-icons adjust-position">{buttonIcon}</i>
      </Button>
  </Tooltip>
)

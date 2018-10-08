import React from 'react';
import { Button, Tooltip } from 'antd';

export default ({ className, icon, iconClassName, onClickAction, tooltip }) => (
  <Tooltip arrowPointAtCenter placement="bottom" title={tooltip}>
    <Button className={className} onClick={onClickAction}>
      <i className={`material-icons ${iconClassName}`}>{icon}</i>
    </Button>
  </Tooltip>
);

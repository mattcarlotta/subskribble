import React from 'react';
import { Button, Popconfirm, Tooltip } from 'antd';

export default ({ button, buttonAction, title, popTitle }) => (
  <Popconfirm
    arrowPointAtCenter
    cancelText="No"
    title={popTitle}
    okText="Yes"
    onConfirm={buttonAction}
    overlayClassName="table-tooltip"
  >
    <Tooltip arrowPointAtCenter placement="bottom" title={title}>
      <Button className="table-status-action">
        <i className="material-icons">{button}</i>
      </Button>
    </Tooltip>
  </Popconfirm>
);

import React, { PureComponent } from 'react';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';

export default class UpdateItemStatus extends PureComponent {
  handleStatusUpdate = () => {
    const { updateAction, statusType, id } = this.props;
    const updateType = statusType === "activate" ? "activated" : "suspended";
    const statusChange = statusType === "activate" ? "active" : "suspended";
    updateAction(updateType, statusChange, id);
  }

  render = () => {
    const { statusType } = this.props;
    const buttonIcon = statusType === "activate" ? "settings_backup_restore" : "do_not_disturb"
    return (
      <Popconfirm
        arrowPointAtCenter
        cancelText="No"
        title={`Are you sure you want to ${statusType} this item?`}
        okText="Yes"
        onConfirm={this.handleStatusUpdate}
        overlayClassName="table-tooltip"
      >
        <Tooltip
          arrowPointAtCenter
          placement="bottom"
          title={`${statusType.charAt(0).toUpperCase()+statusType.slice(1)}`}
        >
          <Button className="table-status-action">
            <i className="material-icons">{buttonIcon}</i>{ }
          </Button>
        </Tooltip>
        <Divider type="vertical" />
      </Popconfirm>
    )
  }
}

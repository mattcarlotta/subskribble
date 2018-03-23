import React, { PureComponent } from 'react';
import { Button, Divider, Popconfirm } from 'antd';

export default class UpdateItemStatus extends PureComponent {
  handleStatusUpdate = () => {
    const { updateAction, statusType, id } = this.props;
    const updateType = statusType === "activate" ? "activated" : "suspended";
    const statusChange = statusType === "activate" ? "active" : "suspended";
    updateAction(updateType, statusChange, id);
  }

  render = () => (
    <Popconfirm
      arrowPointAtCenter
      cancelText="No"
      title={`Are you sure you want to ${this.props.statusType} this item?`}
      okText="Yes"
      onConfirm={this.handleStatusUpdate}
      overlayClassName="table-tooltip"
    >
      <Button className="table-status-action">{this.props.statusType}</Button>
      <Divider type="vertical" />
    </Popconfirm>
  )
}

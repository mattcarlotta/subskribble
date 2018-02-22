import React, { PureComponent } from 'react';
import { Button, Divider, Popconfirm } from 'antd';

export default class UpdateItemStatus extends PureComponent {
  handleStatusUpdate = () => {
    console.log(`requested update to ${this.props.userid}'s status`);
  }

  render = () => (
    <Popconfirm
      arrowPointAtCenter
      cancelText="No"
      title={`Are you sure you want to ${this.props.statusButton} this item?`}
      okText="Yes"
      onConfirm={this.handleStatusUpdate}
      overlayClassName="table-tooltip"
    >
      <Button className="table-status-action">{this.props.statusButton}</Button>
      <Divider type="vertical" />
    </Popconfirm>
  )
}

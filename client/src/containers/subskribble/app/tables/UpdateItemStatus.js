import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Popconfirm } from 'antd';
import { updateSubscriber } from '../../../../actions/tableActions';

class UpdateItemStatus extends PureComponent {
  handleStatusUpdate = () => {
    const { updateSubscriber, statusType, userid } = this.props;
    console.log(`requested ${statusType} to ${userid}'s status`);
    const updateType = statusType === "activate" ? "activated" : "suspended";
    const statusChange = statusType === "activate" ? "active" : "suspended";
    updateSubscriber(updateType, statusChange, userid);
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

export default connect(null, { updateSubscriber })(UpdateItemStatus)

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Popconfirm } from 'antd';
import { suspendSubscriber } from '../../../../actions/tableActions';

class UpdateItemStatus extends PureComponent {
  handleStatusUpdate = () => {
    const { suspendSubscriber, statusButton, userid } = this.props;
    console.log(`requested ${statusButton} to ${userid}'s status`);
    const updateType = statusButton === "activate" ? "activated" : "suspended";
    const statusType = statusButton === "activate" ? ['inactive', 'suspended'] : ['active'];
    suspendSubscriber(updateType, statusType, userid);
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

export default connect(null, { suspendSubscriber })(UpdateItemStatus)

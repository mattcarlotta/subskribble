import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { deleteSubscriber } from '../../../../actions/tableActions';

class DeleteItem extends PureComponent {
  handleDelete = () => {
    const { deleteSubscriber, userid  } = this.props;
    console.log(`requested to delete this record: ${userid}`);
    deleteSubscriber(userid);
  }

  render = () => (
    <Popconfirm
      arrowPointAtCenter
      cancelText="No"
      title="Are you sure you want to delete this item?"
      okText="Yes"
      onConfirm={this.handleDelete}
      overlayClassName="table-tooltip"
    >
      <Button>Delete</Button>
    </Popconfirm>
  )
}

export default connect(null, { deleteSubscriber })(DeleteItem)

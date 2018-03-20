import React, { PureComponent } from 'react';
import { Button, Popconfirm } from 'antd';

class DeleteItem extends PureComponent {
  handleDelete = () => {
    const { deleteAction, id  } = this.props;
    console.log(`requested to delete this record: ${id}`);
    deleteAction(id);
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

export default DeleteItem;

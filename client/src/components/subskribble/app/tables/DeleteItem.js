import React, { PureComponent } from 'react';
import { Button, Popconfirm } from 'antd';

export default class DeleteItem extends PureComponent {
  handleDelete = () => {
    const { deleteAction, id  } = this.props;
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

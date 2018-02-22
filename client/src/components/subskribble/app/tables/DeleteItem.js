import React, { Component } from 'react';
import { Button, Popconfirm } from 'antd';

export default class DeleteItem extends Component {
  handleDelete = () => {
    console.log(`requested to delete this record: ${this.props.id}`);
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

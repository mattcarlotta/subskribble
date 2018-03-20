import React, { Component, Fragment } from 'react';
import { Button, Divider, Popconfirm } from 'antd';

export default class EditItem extends Component {
  handleEdit = () => {
    console.log(`requested to edit this record: ${this.props.id}`);
  }

  render = () => (
    <Fragment>
      <Popconfirm
        arrowPointAtCenter
        cancelText="No"
        title="Are you sure you want to edit this item?"
        okText="Yes"
        onConfirm={this.handleEdit}
        overlayClassName="table-tooltip"
        >
          <Button>Edit</Button>
      </Popconfirm>
      <Divider type="vertical" />
    </Fragment>
  )
}

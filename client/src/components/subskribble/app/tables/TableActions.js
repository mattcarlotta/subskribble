import React, { PureComponent } from 'react';
import { Button, Divider, Dropdown, Icon, Menu } from 'antd';
const { Item: MenuItem } = Menu;

export default class TableActions extends PureComponent {
  handleDelete = record => {
    console.log('delete this record', record);
  }

  handleSelectOption = (key, record) => {
    console.log(`handle this ${key}`, record);
  }

  handleStatusUpdate = record => {
    const { status, subscriber } = record;
    const newStatus = (status === "inactive" || status === "suspended") ? "active" : "suspended"
    console.log(`update ${subscriber}'s status from ${status} to ${newStatus}`, record);
  }

  renderMoreActions = record => (
    <Menu onClick={({key}) => this.handleSelectOption(key, record) }>
      <MenuItem key="Refund">
        Refund
      </MenuItem>
      <MenuItem key="Message">
        Message
      </MenuItem>
      <MenuItem key="Report">
        Report
      </MenuItem>
    </Menu>
  )

  render() {
    const { record } = this.props;
    return (
      <span>
        { record.status
          ? record.status === "inactive" || record.status === "suspended"
            ? <Button onClick={() => this.handleStatusUpdate(record)}>Activate</Button>
            : <Button onClick={() => this.handleStatusUpdate(record)}>Suspend</Button>
          : null
        }
        <Divider type="vertical" />
        <Button onClick={() => this.handleDelete(record)}>Delete</Button>
        <Divider type="vertical" />
        <Dropdown overlay={this.renderMoreActions(record)} trigger={['click']}>
          <Button>
            More Actions <Icon type="down" />
          </Button>
        </Dropdown>
      </span>
    )
  }
}

import map from 'lodash/map';
import React, { PureComponent } from 'react';
import { Button, Divider, Dropdown, Icon, Menu } from 'antd';
const { Item: MenuItem } = Menu;
const OPTIONS = ["Refund", "Message", "Report"]

export default class TableActions extends PureComponent {
  handleDelete = e => {
    const { userid } = e.target.dataset;
    console.log(`requested to delete this record: ${userid}`);
  }

  handleSelectOption = ({key, item: {props}}) => {
    const { id } = props;
    console.log(`requested a ${key} to ${id}`);
  }

  handleStatusUpdate = e => {
    const { userid } = e.target.dataset;
    console.log(`requested update to ${userid}'s status`);
  }

  renderMoreActions = id => (
    <Menu onClick={elem => this.handleSelectOption(elem) }>
      {map(OPTIONS, option => (
        <MenuItem id={id} key={option}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  )

  render() {
    const { id, status } = this.props.record;
    return (
      <span>
        { status
          ? status === "inactive" || status === "suspended"
            ? <Button data-userid={id} onClick={this.handleStatusUpdate}>Activate</Button>
            : <Button data-userid={id} onClick={this.handleStatusUpdate}>Suspend</Button>
          : null
        }
        <Divider type="vertical" />
        <Button data-userid={id} onClick={this.handleDelete}>Delete</Button>
        <Divider type="vertical" />
        <Dropdown overlay={this.renderMoreActions(id)} trigger={['click']}>
          <Button>
            More Actions <Icon type="down" />
          </Button>
        </Dropdown>
      </span>
    )
  }
}

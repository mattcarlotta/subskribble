import map from 'lodash/map';
import React, { PureComponent, Fragment } from 'react';
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
    const { id, status, type } = this.props.record;
    return (
      <Fragment>
        { status
          ? status === "inactive" || status === "suspended"
            ? [
              <Button key="activate-button" data-userid={id} onClick={this.handleStatusUpdate}>Activate</Button>,
              <Divider key="divider1" type="vertical" />
            ]
            : [
              <Button key="suspend-button" data-userid={id} onClick={this.handleStatusUpdate}>Suspend</Button>,
              <Divider key="divider1" type="vertical" />
            ]
          : null
        }
        <Button data-userid={id} onClick={this.handleDelete}>Delete</Button>
        { !type
          ? [
              <Divider key="divider2" type="vertical" />,
              <Dropdown key="more-actions" overlay={this.renderMoreActions(id)} trigger={['click']}>
                <Button>
                  More Actions <Icon type="down" />
                </Button>
              </Dropdown>
            ]
          : null
        }
      </Fragment>
    )
  }
}

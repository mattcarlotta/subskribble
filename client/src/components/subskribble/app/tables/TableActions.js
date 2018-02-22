import map from 'lodash/map';
import React, { PureComponent, Fragment } from 'react';
import { Button, Divider, Dropdown, Icon, Menu } from 'antd';
import DeleteItem from './DeleteItem';
import UpdateSubscriberStatus from './UpdateSubscriberStatus'
const { Item: MenuItem } = Menu;
const OPTIONS = ["Refund", "Message", "Report"]

export default class TableActions extends PureComponent {
  handleSelectOption = ({key, item: {props}}) => {
    const { id } = props;
    console.log(`requested a ${key} to ${id}`);
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

  render = () => {
    const { billEvery, id, invoice, status, type } = this.props.record;
    const statusButton = (status === "inactive" || status === "suspended") ? "activate" : "suspend";
    return (
      <Fragment>
        { status && !invoice
          ? <UpdateSubscriberStatus userid={id} statusButton={statusButton} />
          : null
        }
        <DeleteItem userid={id} />
        { !type && !billEvery
          ? <Fragment>
              <Divider type="vertical" />
              <Dropdown overlay={this.renderMoreActions(id)} trigger={['click']}>
                <Button>
                  More Actions <Icon type="down" />
                </Button>
              </Dropdown>
            </Fragment>
          : null
        }
      </Fragment>
    )
  }
}

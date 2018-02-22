import map from 'lodash/map';
import React, { Fragment, PureComponent } from 'react';
import { Button, Divider, Dropdown, Icon, Menu } from 'antd';
const { Item: MenuItem } = Menu;
const OPTIONS = ["Refund", "Message", "Report"]

export default class MoreActions extends PureComponent {
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

  render = () => (
    <Fragment>
      <Divider type="vertical" />
      <Dropdown overlay={this.renderMoreActions(this.props.userid)} trigger={['click']}>
        <Button>
          More Actions <Icon type="down" />
        </Button>
      </Dropdown>
    </Fragment>
  )
}

// import map from 'lodash/map';
import Drawer from 'rc-drawer-menu';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Menu, Tooltip } from 'antd';
const { Item: MenuItem, ItemGroup: MenuItemGroup, SubMenu } = Menu;

class SideBar extends Component {
  state = { openSideNav: false }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.location !== this.props.location || nextState.openSideNav !== this.state.openSideNav;
  }

  handleMenuToggle = () => this.setState({ openSideNav: !this.state.openSideNav });

  handleTabClick = ({key}) => this.setState({ openSideNav: !this.state.openSideNav }, () => browserHistory.push(`/subskribble/${key}`))

  showMenuToggleButton = () => (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      title="Admin Panel"
      >
        <i className="material-icons nav-button-icon">developer_board</i>
    </Tooltip>
  )

  showMenuTitle = (icon, title) => (
    <span>
      <Icon>
        <i className="material-icons menu-icon">{icon}</i>
      </Icon>
      <span>{title}</span>
    </span>
  )

  render = () => (
    this.props.isAdmin
      ? <Drawer
          handleChild={<i className="material-icons">supervisor_account</i>}
          open={this.state.openSideNav}
          onMaskClick={this.handleMenuToggle}
          placement="right"
          onHandleClick={this.handleMenuToggle}
        >
          <div key="menu-header" className="drawer-menu-header">
            <p className="text">admin panel</p>
          </div>
          <Menu
            key="menu-container"
            className="drawer-menu-container"
            onSelect={this.handleTabClick}
            mode="inline"
          >
            <SubMenu key="sub1" title={this.showMenuTitle('people_outline', 'Subscribers')}>
              <MenuItemGroup key="g1" title="Item 1">
                <MenuItem key="1">Option 1</MenuItem>
                <MenuItem key="2">Option 2</MenuItem>
              </MenuItemGroup>
              <MenuItemGroup key="g2" title="Item 2">
                <MenuItem key="3">Option 3</MenuItem>
                <MenuItem key="4">Option 4</MenuItem>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={this.showMenuTitle('content_paste', 'Plans')}>
              <MenuItem key="5">Option 5</MenuItem>
              <MenuItem key="6">Option 6</MenuItem>
              <SubMenu key="sub3" title="Submenu">
                <MenuItem key="7">Option 7</MenuItem>
                <MenuItem key="8">Option 8</MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={this.showMenuTitle('new_releases', 'Promotionals')}>
              <MenuItem key="9">Option 9</MenuItem>
              <MenuItem key="10">Option 10</MenuItem>
              <MenuItem key="11">Option 11</MenuItem>
              <MenuItem key="12">Option 12</MenuItem>
            </SubMenu>
            <SubMenu key="sub5" title={this.showMenuTitle('payment', 'Transactions')}>
              <MenuItem key="13">Option 9</MenuItem>
              <MenuItem key="14">Option 10</MenuItem>
              <MenuItem key="15">Option 11</MenuItem>
              <MenuItem key="16">Option 12</MenuItem>
            </SubMenu>
          </Menu>
        </Drawer>
      : null
  );
}

export default connect(state => ({ isAdmin: state.auth.isGod }))(SideBar);

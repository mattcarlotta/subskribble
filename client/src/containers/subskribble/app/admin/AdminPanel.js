// import map from 'lodash/map';
import Drawer from 'rc-drawer-menu';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Tooltip } from 'antd';
import actions from '../../../../actions/adminActions';
const { Item: MenuItem, SubMenu } = Menu;

class SideBar extends Component {
  state = { openSideNav: false }

  shouldComponentUpdate = (nextProps, nextState) => (nextProps.location !== this.props.location || nextState.openSideNav !== this.state.openSideNav)

  handleMenuToggle = () => this.setState({ openSideNav: !this.state.openSideNav });

  handleTabClick = ({key}) => {
    const type = key.toString();
    switch (type) {
      case '1': return this.props.createSubscriber();
      case '6': return this.props.createPlan();
      case '7': return this.props.deletePlan();
      default: return console.log('nothing selected');
    }
  }

  showMenuToggleButton = () => (
    <Tooltip
      arrowPointAtCenter
      placement="bottom"
      title="Admin Panel"
      >
        <i className="material-icons nav-button-icon">developer_board</i>
    </Tooltip>
  )

  showMenuTitle = (icon, title, className) => (
    <span>
      <Icon>
        <i className={`material-icons ${className}`}>{icon}</i>
      </Icon>
      <span>{title}</span>
    </span>
  )

  render = () => (
    this.props.isAdmin
      ? <Drawer
          handleChild={<i className="material-icons">build</i>}
          open={this.state.openSideNav}
          onMaskClick={this.handleMenuToggle}
          placement="right"
          onHandleClick={this.handleMenuToggle}
        >
          <div key="menu-header" className="drawer-menu-header">
            <div className="title">admin panel</div>
          </div>
          <Menu
            key="menu-container"
            className="drawer-menu-container"
            onSelect={this.handleTabClick}
            mode="inline"
            selectedKeys={['0']}
          >
            <SubMenu key="sub1" title={this.showMenuTitle('people_outline', 'Subscribers', 'menu-title')}>
              <MenuItem key="1">{this.showMenuTitle('add', 'Create', 'menu-option')}</MenuItem>
              <MenuItem key="2">{this.showMenuTitle('delete', 'Delete', 'menu-option')}</MenuItem>
              <MenuItem key="3">{this.showMenuTitle('do_not_disturb', 'Suspend', 'menu-option')}</MenuItem>
              <MenuItem key="4">{this.showMenuTitle('settings_backup_restore', 'Activate', 'menu-option')}</MenuItem>
              <MenuItem key="5">{this.showMenuTitle('delete_sweep', 'Delete All', 'menu-option')}</MenuItem>
            </SubMenu>
            <SubMenu key="sub2" title={this.showMenuTitle('content_paste', 'Plans', 'menu-title')}>
              <MenuItem key="6">{this.showMenuTitle('add', 'Create', 'menu-option')}</MenuItem>
              <MenuItem key="7">{this.showMenuTitle('delete', 'Delete', 'menu-option')}</MenuItem>
              <MenuItem key="8">{this.showMenuTitle('do_not_disturb', 'Suspend', 'menu-option')}</MenuItem>
              <MenuItem key="9">{this.showMenuTitle('settings_backup_restore', 'Activate', 'menu-option')}</MenuItem>
              <MenuItem key="10">{this.showMenuTitle('delete_sweep', 'Delete All', 'menu-option')}</MenuItem>
            </SubMenu>
            <SubMenu key="sub4" title={this.showMenuTitle('new_releases', 'Promotionals', 'menu-title')}>
              <MenuItem key="11">{this.showMenuTitle('add', 'Create', 'menu-option')}</MenuItem>
              <MenuItem key="12">{this.showMenuTitle('delete', 'Delete', 'menu-option')}</MenuItem>
              <MenuItem key="13">{this.showMenuTitle('do_not_disturb', 'Suspend', 'menu-option')}</MenuItem>
              <MenuItem key="14">{this.showMenuTitle('settings_backup_restore', 'Activate', 'menu-option')}</MenuItem>
              <MenuItem key="15">{this.showMenuTitle('delete_sweep', 'Delete All', 'menu-option')}</MenuItem>
            </SubMenu>
            <SubMenu key="sub5" title={this.showMenuTitle('payment', 'Transactions', 'menu-title')}>
              <MenuItem key="16">{this.showMenuTitle('add', 'Create', 'menu-option')}</MenuItem>
              <MenuItem key="17">{this.showMenuTitle('delete', 'Delete', 'menu-option')}</MenuItem>
              <MenuItem key="18">{this.showMenuTitle('do_not_disturb', 'Suspend', 'menu-option')}</MenuItem>
              <MenuItem key="19">{this.showMenuTitle('settings_backup_restore', 'Activate', 'menu-option')}</MenuItem>
              <MenuItem key="20">{this.showMenuTitle('delete_sweep', 'Delete All', 'menu-option')}</MenuItem>
            </SubMenu>
          </Menu>
        </Drawer>
      : null
  );
}

export default connect(state => ({ isAdmin: state.auth.isGod }), { ...actions })(SideBar);

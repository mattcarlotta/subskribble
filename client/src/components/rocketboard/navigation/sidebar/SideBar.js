import map from 'lodash/map';
import Drawer from 'rc-drawer-menu';
import React, { Component, Fragment } from 'react';
import { browserHistory } from 'react-router';
import { Avatar, Menu } from 'antd';
import TABLINKS from '../links/tabLinks';
import matt from '../../../../images/people/matt.png';
const { Item: MenuItem } = Menu;

export default class SideBar extends Component {
  state = { openNav: false }

  handleMenuToggle = () => this.setState({ openNav: !this.state.openNav });

  handleTabClick = (requestedTab) => {
    browserHistory.push(`/rocketboard/${requestedTab}`);
    this.handleMenuToggle();
  }

  render() {
    return (
      <Fragment>
        <i
          className="material-icons menu-toggle"
          onClick={this.handleMenuToggle}
        >
          menu
        </i>
        <Drawer
          width="240px"
          open={this.state.openNav}
          onMaskClick={this.handleMenuToggle}
          iconChild={false}
          level={null}
        >
          <div className="user-header">
            <Avatar
              shape="circle"
              size="large"
              src={matt}
              style={{ borderRadius: '50%', height: 64, marginTop: 15, width: 64 }}
            />
            <p className="user-name">Matt Carlotta</p>
            <p className="user-email">carlotta.matt@gmail.com</p>
          </div>
          <Menu
            // style={{ width: 240 }}
            className="drawer-menu-container"
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            mode="inline"
            onSelect={ ({key}) => this.handleTabClick(key) }
          >
            {map(TABLINKS, ({ icon, label }) => (
              <MenuItem style={{ margin: 0 }} key={label}>
                <i className="material-icons menu-icon">{icon}</i>
                <span className="menu-label">
                  {label}
                </span>
              </MenuItem>
            ))}
          </Menu>
        </Drawer>
      </Fragment>
    );
  }
}

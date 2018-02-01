import map from 'lodash/map';
import Drawer from 'rc-drawer-menu';
import React, { Component, Fragment } from 'react';
import { browserHistory } from 'react-router';
import { Menu } from 'antd';
import TABLINKS from '../links/tabLinks';
import LeftNav from '../leftNav';
const { Item: MenuItem } = Menu;

export default class SideBar extends Component {
  state = { openNav: false }

  handleMenuToggle = () => this.setState({ openNav: !this.state.openNav });

  handleTabClick = (requestedTab) => {
    browserHistory.push(`/subskribble/${requestedTab}`);
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
          level={null}
          open={this.state.openNav}
          onMaskClick={this.handleMenuToggle}
          iconChild={false}
          width="265px"
        >
          <div className="logo-header">
            <i
              className="material-icons menu-toggle"
              onClick={this.handleMenuToggle}
            >
              menu
            </i>
            <LeftNav />
          </div>
          <Menu
            className="drawer-menu-container"
            mode="inline"
            onSelect={ ({key}) => this.handleTabClick(key) }
          >
            {map(TABLINKS, ({ icon, label }) => (
              <MenuItem style={{ margin: 0 }} key={label}>
                <i className="material-icons menu-icon">{icon}</i>
                <span className="menu-label">
                  {label.charAt(0).toUpperCase()+label.slice(1)}
                </span>
              </MenuItem>
            ))}
          </Menu>
        </Drawer>
      </Fragment>
    );
  }
}

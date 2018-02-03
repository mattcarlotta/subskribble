import map from 'lodash/map';
import Drawer from 'rc-drawer-menu';
import React, { Component, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Menu } from 'antd';
import TABLINKS from '../links/tabLinks';
import LeftNav from '../leftNav';
import NavButton from '../navButton';
const { Item: MenuItem } = Menu;

class SideBar extends Component {
  state = { openNav: false, selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] }

  componentDidUpdate = (prevProps) => {
    const pathname = this.props.location.pathname.replace(/\/subskribble\//g,'');
    const selectedTab = this.state.selectedKey[0];
    if (this.props.location !== prevProps.location && pathname !== selectedTab)  {
      this.setState({ selectedKey: [pathname] })
    }
  }

  handleMenuToggle = () => this.setState({ openNav: !this.state.openNav });

  handleTabClick = (requestedTab) => {
    this.setState({ selectedKey: [requestedTab] }, () => {
      browserHistory.push(`/subskribble/${requestedTab}`);
      this.handleMenuToggle();
    })
  }

  handleMenuButton = (icon, tooltip) => (
    <NavButton
      icon={icon}
      onClickAction={this.handleMenuToggle}
      tooltip={tooltip}
    />
  )

  render() {
    const { selectedKey } = this.state;
    return (
      <Fragment>
        {this.handleMenuButton("menu", "Menu")}
        <Drawer
          level={null}
          open={this.state.openNav}
          onMaskClick={this.handleMenuToggle}
          iconChild={false}
          width="265px"
        >
          <div className="drawer-menu-header">
            <LeftNav />
            {this.handleMenuButton("close")}
          </div>
          <Menu
            className="drawer-menu-container"
            mode="inline"
            selectedKeys={selectedKey}
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

export default withRouter(SideBar);

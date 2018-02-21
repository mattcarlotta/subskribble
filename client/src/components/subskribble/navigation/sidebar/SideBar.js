import map from 'lodash/map';
import Drawer from 'rc-drawer-menu';
import React, { Component, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Menu } from 'antd';
import TABLINKS from '../links/tabLinks';
import LeftNav from '../leftNav';
import NavButton from '../navButton';
const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu;

class SideBar extends Component {
  state = { openSideNav: false, selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] }

  componentDidUpdate = (prevProps) => {
    const pathname = this.props.location.pathname.replace(/\/subskribble\//g,'');
    const selectedTab = this.state.selectedKey[0];
    if (this.props.location !== prevProps.location && pathname !== selectedTab)  {
      this.setState({ selectedKey: [pathname] })
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.location !== this.props.location || nextState.openSideNav !== this.state.openSideNav;
  }

  handleMenuToggle = () => this.setState({ openSideNav: !this.state.openSideNav });

  handleTabClick = (requestedTab) => {
    browserHistory.push(`/subskribble/${requestedTab}`);
    this.handleMenuToggle();
  }

  handleMenuButton = (icon) => (
    <NavButton
      icon={icon}
      onClickAction={this.handleMenuToggle}
      tooltip={(icon === "menu") ? "Menu" : ""}
    />
  )

  render() {
    const { openSideNav, selectedKey } = this.state;
    return (
      <Fragment>
        {this.handleMenuButton("menu")}
        <Drawer
          level={null}
          open={openSideNav}
          onMaskClick={this.handleMenuToggle}
          iconChild={false}
          width="270px"
        >
          <div className="drawer-menu-header">
            <LeftNav onClickAction={this.handleMenuToggle} />
            {this.handleMenuButton("close")}
          </div>
          <Menu
            className="drawer-menu-container"
            mode="inline"
            selectedKeys={selectedKey}
            onSelect={ ({key}) => this.handleTabClick(key) }
          >
            {map(TABLINKS, ({ dividerLabel, icon, label }) => {
              return (
                <MenuItemGroup
                  key={label}
                  title={ dividerLabel && <h6 className="divider-title">{dividerLabel}</h6> }
                >
                  <MenuItem style={{ margin: 0 }} key={label}>
                    <i className="material-icons menu-icon">{icon}</i>
                    <span className="menu-label">
                      {label.charAt(0).toUpperCase()+label.slice(1)}
                    </span>
                  </MenuItem>
                </MenuItemGroup>
              )
            })}
          </Menu>
        </Drawer>
      </Fragment>
    );
  }
}

export default withRouter(SideBar);

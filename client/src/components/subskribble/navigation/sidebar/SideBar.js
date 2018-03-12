import Drawer from 'rc-drawer-menu';
import React, { Component, Fragment } from 'react';
import { browserHistory, withRouter } from 'react-router';

import NavButton from '../navButton';
import SideBarMenu from './sideBarMenu';

class SideBar extends Component {
  state = { openSideNav: false, selectedKey: [this.props.location.pathname.replace(/\/subskribble\//g,'')] }

  componentDidUpdate = (prevProps) => {
    const pathname = this.props.location.pathname.replace(/\/subskribble\//g,'');
    const selectedTab = this.state.selectedKey[0];
    if (this.props.location !== prevProps.location && pathname !== selectedTab) {
      this.setState({ selectedKey: [pathname] })
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.location !== this.props.location || nextState.openSideNav !== this.state.openSideNav;
  }

  handleMenuToggle = () => this.setState({ openSideNav: !this.state.openSideNav });

  handleTabClick = ({key}) => this.setState({ openSideNav: !this.state.openSideNav }, () => browserHistory.push(`/subskribble/${key}`))

  handleMenuButton = (icon) => (
    <NavButton
      icon={icon}
      onClickAction={this.handleMenuToggle}
      tooltip={(icon === "menu") ? "Menu" : ""}
    />
  )

  render = () => (
    <Fragment>
      {this.handleMenuButton("menu")}
      <Drawer
        level={null}
        open={this.state.openSideNav}
        onMaskClick={this.handleMenuToggle}
        iconChild={false}
        width="270px"
      >
        <SideBarMenu
          handleMenuButton={this.handleMenuButton}
          handleMenuToggle={this.handleMenuToggle}
          handleTabClick={this.handleTabClick}
          selectedKey={this.state.selectedKey}
        />
      </Drawer>
    </Fragment>
  );
}

export default withRouter(SideBar);

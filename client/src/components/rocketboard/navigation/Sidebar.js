import map from 'lodash/map';
import React from 'react';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import TABLINKS from './links/tabLinks';
import CustomerAvatar from './avatar/customerAvatar';

export default class Sidebar extends React.Component {
  state = { openNav: false };

  handleMenuToggle = () => this.setState({ openNav: !this.state.openNav });

  handleTabClick = (requestedTab) => {
    browserHistory.push(`/rocketboard/${requestedTab}`);
    this.handleMenuToggle();
  }

  render() {
    return (
      <div className="left-nav">
        <IconButton
          iconStyle={{ width: 30, height: 30, color: '#f2f2f2' }}
          style={{ width: 60, height: 60 }}
          className="btn-container"
          onClick={this.handleMenuToggle}
          tooltip="Menu"
          tooltipPosition="bottom-right"
          tooltipStyles={{ zIndex: 100 }}
          >
            <NavigationMenu/>
        </IconButton>
        <Drawer
          docked={false}
          width={256}
          open={this.state.openNav}
          onRequestChange={this.handleMenuToggle}
          style={{ textTransform: 'capitalize' }}
        >
          <div className="user-header">
            <CustomerAvatar size={64} marginSize={'30px'} />
            <p><strong>Matt Carlotta</strong></p>
            <p>carlotta.matt@gmail.com</p>
          </div>
          {map(TABLINKS, ({ icon, label }, key) => {
              return (
                <MenuItem
                  key={key}
                  primaryText={label}
                  style={{ fontFamily: 'Poppins Regular, sans-serif' }}
                  onClick={() => this.handleTabClick(label)}
                  leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
                />
              )
          })}
        </Drawer>
      </div>
    );
  }
}

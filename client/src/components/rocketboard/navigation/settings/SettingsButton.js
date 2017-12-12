import map from 'lodash/map';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

import CustomerAvatar from '../avatar/customerAvatar';
import RIGHTNAVLINKS from '../links/rightNavLinks';

export default class SettingsButton extends Component {
  state={ settingsTab: false };

  handleClick = (requestedPage) => {
    browserHistory.push(`${requestedPage}`)
    this.handleSettingsClose();
  }

  handleSettingsOpen = () => this.setState({ settingsTab: true });

  handleSettingsOpen = e => {
    e.preventDefault();

    this.setState({
      settingsTab: true,
      anchorEl: e.currentTarget
    });
  }

  handleSettingsClose = () => this.setState({ settingsTab: false });

  render() {
    const { anchorEl, settingsTab } = this.state;

    return(
      <div className="settings-tab">
        <IconButton
          tooltip="My Account"
          tooltipPosition="bottom-center"
          tooltipStyles={{ marginTop: '10px' }}
          iconStyle={{ color: '#0585bf', }}
          onClick={this.handleSettingsOpen}
          style={{ height: 60, width: 60 }}
          disableTouchRipple={true}
          >
            <CustomerAvatar />
        </IconButton>
        <Popover
          style={{ borderRadius: '2px', backgroundColor: '#faf9fa', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px' }}
          open={settingsTab}
          anchorEl={anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleSettingsClose}
          >
          <Menu>
            {
              map(RIGHTNAVLINKS, ({ icon, label, link }, key) => {
                return (
                  <MenuItem
                    key={key}
                    onClick={() => this.handleClick(link)}
                    primaryText={label}
                    leftIcon={<FontIcon className="material-icons">{icon}</FontIcon>}
                  />
                );
              })
            }
            <Divider />
            <MenuItem
              onClick={() => this.handleClick('/')}
              primaryText="Sign out"
              leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
            />
          </Menu>
        </Popover>
      </div>
    )
  }
}

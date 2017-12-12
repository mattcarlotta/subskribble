import filter from 'lodash/filter';
import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ClosePopover from 'material-ui/svg-icons/navigation/close';
import Popover from 'material-ui/Popover';

import NOTIFICATIONS from './notificationData';
import NotificationBody from './notificationBody';
import NotificationEmpty from './notificationEmpty';

class Notifications extends Component {
  state={ notifications: NOTIFICATIONS, notificationCount: NOTIFICATIONS.length, notificationTab: false };

  handleOpenNotifications = e => {
    e.preventDefault();

    this.setState({
      notificationCount: 0,
      notificationTab: true,
      anchorEl: e.currentTarget
    });
  }

  handlePopoverClose = () => this.setState({ activeNote: '', notificationTab: false })

  handleActiveNote = (activeNote) => this.setState({ activeNote })

  removeNotification = (deletedNote) => {
    let { notifications } = this.state;
    notifications = filter(notifications, (notification) => { return notification.id !== deletedNote });
    this.setState({ notifications });
  }

  render() {
    const { anchorEl, activeNote, notifications, notificationCount, notificationTab } = this.state;
    const showNotificationDot = notificationCount > 0 ? 'flex' : 'none';

    return(
      <div className="notifications-icon">
        <Badge
          badgeContent={notificationCount}
          secondary={true}
          badgeStyle={{top: -2, right: -2, backgroundColor: '#F56342', display: showNotificationDot }}
          >
            <IconButton
              tooltip="Notifications"
              tooltipStyles={{ marginTop: '-7px' }}
              onClick={this.handleOpenNotifications}
              iconStyle={{ color: '#fff' }}
              >
              <NotificationsIcon />
            </IconButton>
            <Popover
              style={{ borderRadius: '2px', backgroundColor: '#faf9fa', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px', padding: 0 }}
              open={notificationTab}
              anchorEl={anchorEl}
              anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              onRequestClose={this.handlePopoverClose}
              >
              <Menu
                className="no-padding"
                width={360}
                maxHeight={500}
                >
                  <div className="notifications-header">
                    <div className="note-90">Notifications</div>
                    <div className="note-10">
                      <IconButton
                        onClick={this.handlePopoverClose}
                        iconStyle={{ width: 14, height: 14, color: '#03a9f3' }}
                        style={{ width: 40, height: 40 }}
                        >
                          <ClosePopover />
                      </IconButton>
                    </div>
                  </div>
                  <hr className="divider" />
                  {
                    (notifications.length === 0)
                      ? <NotificationEmpty />
                      : <NotificationBody
                          activeNote={activeNote}
                          handleActiveNote={this.handleActiveNote}
                          notifications={notifications}
                          removeNotification={this.removeNotification}
                        />
                  }
                  <hr className="divider" />
                  <div className="notifications-footer"/>
              </Menu>
            </Popover>
          </Badge>
      </div>
    )
  }
}

export default Notifications;

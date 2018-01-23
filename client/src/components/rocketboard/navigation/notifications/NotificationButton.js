import filter from 'lodash/filter';
import React, { Component } from 'react';
import { Badge, Popover } from 'antd';

import NOTIFICATIONS from './notificationData';
// import NotificationBody from './notificationBody';
// import NotificationEmpty from './notificationEmpty';

class Notifications extends Component {
  state={ notifications: NOTIFICATIONS, notificationCount: NOTIFICATIONS.length, visibleNotifications: false };


  hideNotifications = () => this.setState({ visibleNotifications: false });

  handleVisibleChange = (visible) => this.setState({ visibleNotifications: visible });

  handleActiveNote = (activeNote) => this.setState({ activeNote })

  removeNotification = (deletedNote) => {
    let { notifications } = this.state;
    notifications = filter(notifications, (notification) => { return notification.id !== deletedNote });
    this.setState({ notifications });
  }

  render() {
    // const { activeNote, notifications, notificationCount, notificationTab } = this.state;
    // const showNotificationDot = notificationCount > 0 ? 'flex' : 'none';

    const { visibleNotifications } = this.state;

    return(
      <div className="notifications-container">
        <Badge
          count={this.state.notificationCount}
          offset={[-3,3]}
          showZero={false}
          overflowCount={99}
          >
            <Popover
              arrowPointAtCenter
              content={<a onClick={this.hide}>Close</a>}
              placement="bottomRight"
              trigger="click"
              visible={visibleNotifications}
              onVisibleChange={this.handleVisibleChange}
            >
              <i className="material-icons notifications-icon">notifications</i>
            </Popover>
            {/* <Popover
              className="notification-root"
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
            </Popover> */}
          </Badge>
      </div>
    )
  }
}

export default Notifications;

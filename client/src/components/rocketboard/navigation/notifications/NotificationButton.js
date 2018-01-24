import filter from 'lodash/filter';
import React, { Component } from 'react';
import { Badge, Popover } from 'antd';

import NOTIFICATIONS from './notificationData';
import NotificationBody from './notificationBody';
import NotificationEmpty from './notificationEmpty';

class Notifications extends Component {
  state = { notifications: NOTIFICATIONS, visibleNotifications: false };

  handleVisibleChange = visible => this.setState({ visibleNotifications: visible });

  handleActiveNote = activeNote => this.setState({ activeNote })

  removeNotification = (deletedNote) => {
    const notifications = filter(this.state.notifications, (notification) => { return notification.id !== deletedNote });
    this.setState({ notifications });
  }

  render() {
    const { activeNote, notifications, visibleNotifications } = this.state;
    // const showNotificationDot = notificationCount > 0 ? 'flex' : 'none';

    return(
      <div className="notifications-container">
        <Badge
          count={notifications ? notifications.length : 0}
          offset={[-3,3]}
          showZero={false}
          overflowCount={99}
          >
            <Popover
              arrowPointAtCenter
              content={
                <div className="notifications-popover">
                  <div className="notifications-header">
                    <div className="note-100">Notifications</div>
                  </div>
                  <hr className="divider" />
                  {(notifications.length === 0)
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
                </div>
              }
              placement="bottomRight"
              trigger="click"
              visible={visibleNotifications}
              onVisibleChange={this.handleVisibleChange}
            >
              <i className="material-icons notifications-icon">notifications</i>
            </Popover>
          </Badge>
      </div>
    )
  }
}

export default Notifications;

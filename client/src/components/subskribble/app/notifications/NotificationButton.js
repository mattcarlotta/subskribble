import React, { Component } from 'react';
import { Button, Badge, Popover, Tooltip } from 'antd';

// import NOTIFICATIONS from './notificationData';
import NotificationBody from './notificationBody';
import NotificationEmpty from './notificationEmpty';

export default class Notifications extends Component {
  state = { visibleNotifications: false };

  handleClearNotes = () => {
    // TODO Send request to API to mark all notes as read
    this.props.updateNotifications();
  }

  handleDeleteNote = (e) => {
    const note = e.target.dataset.id;
    this.props.deleteNotification(note);
  }

  handleVisibleChange = visible => this.setState({ visibleNotifications: visible });

  handleNotificationAsRead = (e) => {
    const note = e.target.dataset.id;
    // TODO Send request to API to mark note as read
    this.props.updateNotifications(note);
  }

  render() {
    const { visibleNotifications } = this.state;
    const { unreadNotifications, readNotifications } = this.props;

    return(
      <div className="notifications-container">
        <Tooltip
          arrowPointAtCenter
          placement="bottom"
          title="Notifications"
          overlayClassName="tooltip-placement"
          overlayStyle={{ display: visibleNotifications ? 'none' : ''}}
        >
          <Badge
            count={unreadNotifications ? unreadNotifications.length : 0}
            offset={[-2,1]}
            showZero={false}
            overflowCount={99}
          >
            <Popover
              arrowPointAtCenter
              content={
                <div className="notifications-popover">
                  <div className="notifications-header">
                    <div>Notifications</div>
                  </div>
                  <hr className="divider" />
                  { !unreadNotifications || unreadNotifications.length === 0 || !readNotifications
                    ? <NotificationEmpty />
                    : <NotificationBody
                        handleDeleteNote={this.handleDeleteNote}
                        notifications={[...unreadNotifications, ...readNotifications]}
                      />
                  }
                  <hr className="divider" />
                  <div className="notifications-footer">
                    <Button onClick={this.handleClearNotes} className="clear-notifications">Clear Notifications</Button>
                  </div>
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
        </Tooltip>
      </div>
    )
  }
}

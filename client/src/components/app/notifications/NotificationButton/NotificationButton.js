import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Popover, Tooltip } from 'antd';
import PopoverContent from '../NotificationPopover/popoverContent';
import styles from './NotificationButton.scss';

export default class Notifications extends Component {
  state = { visibleNotifications: false };

  handleClearNotes = () => this.props.removeAllNotifications();

  handleDeleteNote = e => {
    const note = e.target.dataset.id;
    this.props.deleteNotification(note);
  };

  handleVisibleChange = visible => {
    this.setState({ visibleNotifications: visible }, () => {
      const { visibleNotifications } = this.state;
      const { unreadNotifications, updateNotifications } = this.props;

      if (!visibleNotifications && unreadNotifications) updateNotifications();
    });
  };

  handleNotificationAsRead = e => {
    const note = e.target.dataset.id;
    this.props.updateNotifications(note);
  };

  render() {
    const { visibleNotifications } = this.state;
    const { unreadNotifications, readNotifications } = this.props;

    return (
      <div className={styles.notificationsContainer}>
        <Tooltip
          arrowPointAtCenter
          placement="bottom"
          title="Notifications"
          overlayClassName={styles.tooltipPlacement}
          overlayStyle={{ display: visibleNotifications ? 'none' : '' }}
        >
          <Badge
            count={unreadNotifications ? unreadNotifications.length : 0}
            offset={[-1, 2]}
            showZero={false}
            overflowCount={99}
          >
            {/* eslint-disable */}
            <Popover
              arrowPointAtCenter
              content={
                <PopoverContent
                  handleClearNotes={this.handleClearNotes}
                  handleDeleteNote={this.handleDeleteNote}
                  unreadNotifications={unreadNotifications}
                  readNotifications={readNotifications}
                />
              }
              placement="bottomRight"
              trigger="click"
              visible={visibleNotifications}
              onVisibleChange={this.handleVisibleChange}
            >
              {/* eslint-enable */}
              <i
                className={`${styles.materialIcons} ${
                  styles.notificationsIcon
                }`}
              >
                notifications
              </i>
            </Popover>
          </Badge>
        </Tooltip>
      </div>
    );
  }
}

Notifications.propTypes = {
  removeAllNotifications: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
  unreadNotifications: PropTypes.arrayOf(PropTypes.object),
  readNotifications: PropTypes.arrayOf(PropTypes.object),
};

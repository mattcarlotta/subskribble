import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import NotificationBody from '../NotificationBody/notificationBody';
import NotificationEmpty from '../NotificationEmpty/notificationEmpty';
import styles from './popoverContent.scss';

const PopoverContent = ({
  handleClearNotes,
  handleDeleteNote,
  readNotifications,
  unreadNotifications,
}) => (
  <div className={styles.notificationsPopover}>
    <div className={styles.notificationsHeader}>
      <div style={{ float: 'left' }}>Notifications</div>
      <div style={{ float: 'right' }}>
        <Tooltip placement="bottom" title="Remove All Notifications">
          <Button
            onClick={handleClearNotes}
            className={styles.clearNotifications}
          >
            <i className={styles.materialIcons} style={{ fontSize: 21 }}>
              delete_forever
            </i>
          </Button>
        </Tooltip>
      </div>
      <div className="clear-fix" />
    </div>
    <hr className={styles.noteDivider} />
    {isEmpty(unreadNotifications) && isEmpty(readNotifications) ? (
      <NotificationEmpty />
    ) : (
      <NotificationBody
        handleDeleteNote={handleDeleteNote}
        notifications={[
          ...(unreadNotifications || []),
          ...(readNotifications || []),
        ]}
      />
    )}
  </div>
);

export default PopoverContent;

PopoverContent.propTypes = {
  handleClearNotes: PropTypes.func.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  unreadNotifications: PropTypes.arrayOf(PropTypes.object),
  readNotifications: PropTypes.arrayOf(PropTypes.object),
};

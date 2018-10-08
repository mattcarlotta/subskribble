import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import NotificationBody from './notificationBody';
import NotificationEmpty from './notificationEmpty';

const PopoverContent = ({
  handleClearNotes,
  handleDeleteNote,
  readNotifications,
  unreadNotifications,
}) => (
  <div className="notifications-popover">
    <div className="notifications-header">
      <div className="f-l">Notifications</div>
      <div className="f-r">
        <Tooltip placement="bottom" title="Remove All Notifications">
          <Button onClick={handleClearNotes} className="clear-notifications">
            <i className="material-icons" style={{ fontSize: 21 }}>
              delete_forever
            </i>
          </Button>
        </Tooltip>
      </div>
      <div className="clear-fix" />
    </div>
    <hr className="divider" />
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

import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Avatar, Button, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

export default ({ handleNotificationAsRead, notifications }) => (
  <Scrollbars
    style={{ height: 250 }}
    renderThumbVertical={props => <div {...props} className="scrollbar"/>}
  >
    <div className="notifications-body">
      {map(notifications, ({ id, subscriber, messagedate, message }, key) => (
        <div
          dataset-key={key}
          key={key}
          className={(notifications.length -1 === key) ? "note bb-none" : "note" }
          >
            <div className="note-15">
              <Avatar
                shape="circle"
                size={36}
                style={{ position: 'relative', top: -18 }}
              >
               {subscriber.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            <div
              className="note-75">
              <span className="title">
                <Link className="link" to={`/subskribble/subscribers/${subscriber.replace(/\s/g, '').toLowerCase()}`}><strong>{subscriber}</strong></Link> {message}
              </span>
              <p className="date">{messagedate}</p>
            </div>
            <div className="note-10">
              <Tooltip
                arrowPointAtCenter
                placement="bottom"
                title="Mark as read"
              >
                <Button
                  data-id={id}
                  className="mark-as-read-button"
                  onClick={handleNotificationAsRead}
                >
                  <i className="material-icons delete-button">playlist_add_check</i>
                </Button>
              </Tooltip>
            </div>
        </div>
      ))}
    </div>
  </Scrollbars>
)

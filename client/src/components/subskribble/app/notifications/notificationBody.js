import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Avatar, Button, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

export default ({ handleDeleteNote, notifications }) => (
  <Scrollbars
    style={{ height: 250 }}
    renderThumbVertical={props => <div {...props} className="scrollbar"/>}
  >
    <div className="notifications-body">
      {map(notifications, ({ id, subscriber, messagedate, message, read }, key) => (
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
          <div className="note-85">
            <p className="title">
              <Link className="link" to={`/subskribble/subscribers/${subscriber.replace(/\s/g, '').toLowerCase()}`}>
                <strong>{subscriber}</strong>
              </Link>
              {message}
            </p>
            <p className="date">
              {messagedate}
              <span>
                <Tooltip
                  arrowPointAtCenter
                  placement="bottom"
                  title="Delete notification"
                >
                  <Button
                    data-id={id}
                    className="mark-as-read-button"
                    onClick={handleDeleteNote}
                  >
                    <i className="material-icons delete-button">delete</i>
                  </Button>
                </Tooltip>
              </span>
              <span className={`note-status ${read ? "read" : "unread"}`}>
                {read ? "read" : "new"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  </Scrollbars>
)

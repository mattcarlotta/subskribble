import map from 'lodash/map';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Avatar, Button, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

export default class NotificationButton extends Component {
  componentDidUpdate = () => this.refs.scrollbars.scrollTop(0);

  render = () => (
    <Scrollbars
      ref="scrollbars"
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      style={{ height: 250 }}
      renderThumbVertical={props => <div {...props} className="scrollbar"/>}
    >
      <div className="notifications-body">
        {map(this.props.notifications, ({ id, subscriber, messagedate, message, read }, key) => (
          <div dataset-key={key} key={key} className="note bb-none">
            <div className="note-15">
              <Avatar icon="user" size={36} style={{ position: 'relative', top: -18 }}>
                {subscriber.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            <div className="note-85">
              <p className="title">
                <Link className="link" to={`/subskribble/subscribers/${subscriber.replace(/\s/g, '').toLowerCase()}`}>
                  <strong>{subscriber} </strong>
                </Link>
                {message}
              </p>
              <p className="date">
                {messagedate}
                <span>
                  <Tooltip arrowPointAtCenter placement="bottom" title="Delete notification">
                    <Button data-id={id} className="remove-note-button" onClick={this.props.handleDeleteNote}>
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
}

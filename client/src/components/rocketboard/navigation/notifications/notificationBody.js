import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import RemoveNotification from 'material-ui/svg-icons/action/delete';
import { Scrollbars } from 'react-custom-scrollbars';

const NotificationBody = ({ activeNote, handleActiveNote, notifications, removeNotification }) => {
  return (
    <Scrollbars
      style={{ height: 250 }}
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      renderThumbVertical={props => <div {...props} className="scrollbar"/>}
      >
      <div className="notifications-body">
        {
          map(notifications, ({ id, src, link, name, note, date }, key) => {
            return (
              <div
                key={key}
                onMouseEnter={() => handleActiveNote(key)}
                onMouseLeave={() => handleActiveNote('')}
                className={(notifications.length -1 === key) ? "note bb-none" : "note" }
                >
                  <div className="note-15">
                    <Avatar
                     src={src}
                     size={36}
                     style={{ position: 'relative', top: -18 }}
                   />
                  </div>
                  <div
                    className="note-75">
                    <span className="title">
                      <Link className="link" to={`/rocketboard/customers/${link}`}><strong>{name}</strong></Link> {note}
                    </span>
                    <p><span className="date">{date}</span></p>
                  </div>
                  <div className={ key === activeNote ? "note-10" : "hidden"}>
                    <IconButton
                      tooltipPosition="bottom-center"
                      onClick={() => removeNotification(id)}
                      iconStyle={{ width: 20, height: 20, color: '#03a9f3' }}
                      style={{ width: 44, height: 44, position: 'relative', top: -10 }}
                      >
                      <RemoveNotification />
                    </IconButton>
                  </div>
              </div>
            )
          })
        }
      </div>
    </Scrollbars>
  )
}

export default NotificationBody;

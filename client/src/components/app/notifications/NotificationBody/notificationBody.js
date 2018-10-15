import map from 'lodash/map';
import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import styles from './notificationBody.scss';

const colorList = {
  people_outline: '#00A896',
  payment: '#3256a7',
  view_module: '#E06A4F',
  mail_outline: '#1FA2BF',
  content_paste: '#C55D5D',
  new_releases: '#8E4479',
  settings: '#393C40',
};

export default class NotificationButton extends Component {
  componentDidUpdate = () => this.refs.scrollbars.scrollTop(0);

  render = () => (
    <Scrollbars
      ref="scrollbars"
      autoHide
      autoHideTimeout={500}
      autoHideDuration={200}
      style={{ height: 250 }}
      renderThumbVertical={props => (
        <div {...props} className={styles.scrollbar} />
      )}
    >
      <div className={styles.notificationsBody}>
        {map(
          this.props.notifications,
          ({ icon, id, message, messagedate, read }, key) => (
            <div dataset-key={key} key={key} className={styles.note}>
              <div className={styles.note15}>
                <i
                  className={styles.materialIcons}
                  style={{ color: colorList[icon], padding: 5 }}
                >
                  {icon}
                </i>
              </div>
              <div className={styles.note85}>
                <p className={styles.noteTitle}>{message}</p>
                <p className={styles.noteDate}>
                  <span>{moment(messagedate).fromNow()}</span>
                  <span>
                    <Tooltip
                      arrowPointAtCenter
                      placement="bottom"
                      title="Delete notification"
                    >
                      <Button
                        data-id={id}
                        className={styles.removeNoteButton}
                        onClick={this.props.handleDeleteNote}
                      >
                        <i
                          className={`${styles.materialIcons} ${
                            styles.deleteButton
                          }`}
                        >
                          delete
                        </i>
                      </Button>
                    </Tooltip>
                  </span>
                  <span
                    className={`${styles.noteStatus} ${
                      read ? null : styles.unreadNote
                    }`}
                  >
                    {read ? null : 'new'}
                  </span>
                </p>
              </div>
              <div className="clear-fix" />
            </div>
          ),
        )}
      </div>
    </Scrollbars>
  );
}

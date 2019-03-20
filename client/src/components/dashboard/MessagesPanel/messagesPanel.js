import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MiniPanel from 'components/dashboard/MiniPanel/miniPanel.js';
import NoData from 'components/dashboard/NoData/noData.js';
import styles from 'styles/styles.scss';

const MessagesPanel = ({ messages }) => (
  <MiniPanel
    buttonIcon="markunread_mailbox"
    buttonPushLocation="messages/create"
    buttonTipTitle="Send Messages"
    title="Messages"
    titleColor="#1FA2BF"
    titleIcon="mail_outline"
  >
    {messages ? (
      <div className={styles.dashMessages}>
        <h5>Messages Sent ({moment().format('MMMM')})</h5>
        <p className={styles.dashNumber}>
          {parseInt(messages, 10) <= 99 ? messages : '99+'}
        </p>
      </div>
    ) : (
      <NoData />
    )}
  </MiniPanel>
);

MessagesPanel.propTypes = {
  messages: PropTypes.string,
};

export default MessagesPanel;

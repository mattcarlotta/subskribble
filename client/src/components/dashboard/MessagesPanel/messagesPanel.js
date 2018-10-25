import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MiniPanel from '../MiniPanel/miniPanel';
import NoData from '../NoData/noData';
import styles from '../../../styles/index.scss';

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
        <p className={styles.dashNumber}>{messages}</p>
      </div>
    ) : (
      <NoData />
    )}
  </MiniPanel>
);

export default MessagesPanel;

MessagesPanel.propTypes = {
  messages: PropTypes.string,
};

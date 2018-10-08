import React from 'react';
import { Col } from 'antd';
import moment from 'moment';
import CustomButton from '../../app/buttons/customButton';
import NoData from './noData';

export default ({ messages }) => (
  <Col span={8}>
    <div className="mini-panel-container">
      <div className="tab-container">
        <h5 style={{ color: '#1FA2BF' }} className="tab">
          <i className="material-icons">mail_outline</i>
          <span className="title">Messages</span>
        </h5>
        <CustomButton
          buttonIcon="markunread_mailbox"
          className="f-r"
          buttonPushLocation="messages/create"
          tipTitle="Send Messages"
        />
      </div>
      <hr />
      <div className="details-container">
        {messages ? (
          <div className="messages">
            <h5>Messages Sent ({moment().format('MMMM')})</h5>
            <p className="number">{messages}</p>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  </Col>
);

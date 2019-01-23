import map from 'lodash/map';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styles from './showPreview.scss';

const icons = ['star_border', 'reply', 'more_vert'];
const timeStamp = moment().format('LLLL');

const ShowPreview = ({ company, fromSender, message, subject }) => (
  <div className={styles.boxContainer}>
    <Row style={{ marginBottom: 10 }}>
      <Col span={13}>
        <h4 className={styles.subject}>{subject && subject}</h4>
      </Col>
      <Col span={11}>
        {subject && (
          <div className={styles.time}>
            <span className={styles.currentTime}>{timeStamp}</span>
            {map(icons, icon => (
              <i
                key={icon}
                className={`${styles.materialIcons} ${styles.messageIcons}`}
              >
                {icon}
              </i>
            ))}
          </div>
        )}
      </Col>
    </Row>
    <div>
      <span className={styles.fromCompany}>{fromSender ? company : null}</span>
      <span className={styles.fromSender}>
        {fromSender && `<${fromSender}>`}
      </span>
    </div>
    <div className={styles.toAddresse}>
      {fromSender && 'to Firstname Lastname <example@example.com>'}
    </div>
    {subject || fromSender ? <hr /> : null}
    {/* eslint-disable */}
    <div
      className={styles.preview}
      dangerouslySetInnerHTML={{ __html: message }}
    />
    {/* eslint-enable */}
  </div>
);

export default ShowPreview;

ShowPreview.propTypes = {
  company: PropTypes.string,
  fromSender: PropTypes.string,
  message: PropTypes.string,
  subject: PropTypes.string,
};

import map from 'lodash/map';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const icons = ['star_border', 'reply', 'more_vert'];
const timeStamp = moment().format('LLLL');

const ShowPreview = ({ company, fromsender, message, subject }) => (
  <div className="box-container">
    <Row style={{ marginBottom: 10 }}>
      <Col span={13}>
        <h4 className="subject">{subject && subject}</h4>
      </Col>
      <Col span={11}>
        {subject && (
          <div className="time">
            <span className="current-time">{timeStamp}</span>
            {map(icons, icon => (
              <i key={icon} className="material-icons message-icons">
                {icon}
              </i>
            ))}
          </div>
        )}
      </Col>
    </Row>
    <div>
      <span className="from-company">{fromsender ? company : null}</span>
      <span className="from-sender">{fromsender && `<${fromsender}>`}</span>
    </div>
    <div className="to-addresse">
      {fromsender && 'to Firstname Lastname <example@example.com>'}
    </div>
    {subject || fromsender ? <hr /> : null}
    <div className="preview" dangerouslySetInnerHTML={{ __html: message }} />
  </div>
);

export default ShowPreview;

ShowPreview.propTypes = {
  company: PropTypes.string,
  fromsender: PropTypes.string,
  message: PropTypes.string,
  subject: PropTypes.string,
};

import map from 'lodash/map';
import moment from 'moment';
import React from 'react';
import { Row, Col } from 'antd';

const icons = ['star_border', 'reply', 'more_vert'];
const timeStamp = moment().format("LLLL");

export default ({ company, fromSender, message, subject }) => (
  <div className="box-container">
      <Row style={{ marginBottom: 10 }}>
        <Col span={16}>
          <h4 className="subject">{ subject ? subject : null }</h4>
        </Col>
        <Col span={8}>
          { subject &&
            <div className="time">
              <span className="current-time">
                { timeStamp }
              </span>
              { map(icons, icon => (<i key={icon} className="material-icons message-icons">{icon}</i>)) }
            </div>
          }
        </Col>
      </Row>
    <div>
      <span className="from-company">{ fromSender ? company : null }</span>
      <span className="from-sender">{ fromSender ? ` <${fromSender}>` : null }</span>
    </div>
    <div className="to-addresse">{ fromSender ? 'to Firstname Lastname <example@example.com>' : null }</div>
    <div className="preview" dangerouslySetInnerHTML={{ __html: message }} />
  </div>
)

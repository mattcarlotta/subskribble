import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';

export default ({ company, fromSender, message, subject }) => (
  <div className="preview-box-container">
    <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Preview Template</h1>
    { (!fromSender && !subject && (message === "<p><br></p>" || !message))
      ? <div className="box-empty">
          <div className="empty-icon">
            <i className="material-icons pencil">create</i>
            <div>
              Fill in the fields to update this preview!
            </div>
          </div>
        </div>
      : <div className="box-container">
        <Row style={{ marginBottom: 10 }}>
          <Col span={16}>
            <h4 className="subject">{ subject ? subject : null }</h4>
          </Col>
          <Col span={8}>
            { subject &&
              <div className="time">
                <span className="current-time">
                  { moment().format("LLLL") }
                </span>
                <i className="material-icons message-icons">star_border</i>
                <i className="material-icons message-icons">reply</i>
                <i className="material-icons message-icons">more_vert</i>
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
    }
  </div>
)

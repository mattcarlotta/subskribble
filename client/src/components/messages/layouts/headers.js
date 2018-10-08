import React from 'react';
import moment from 'moment';

export default [
  {
    title: 'Transaction #',
    dataIndex: 'id',
    render: id => <span style={{ textTransform: 'none' }}>{id}</span>,
  },
  {
    title: 'Template',
    dataIndex: 'template',
    render: template => <span className="template-active">{template}</span>,
  },
  {
    title: 'From Sender',
    dataIndex: 'fromsender',
    render: sender => <span className="lowercase">{sender}</span>,
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    render: subject => <span style={{ textTransform: 'none' }}>{subject}</span>,
  },
  {
    title: 'Sent Date',
    dataIndex: 'sentdate',
    render: date => (
      <span className="date">{moment(date).format('MMM Do, YYYY')}</span>
    ),
  },
];

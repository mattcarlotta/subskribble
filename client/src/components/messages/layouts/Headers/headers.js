import React from 'react';
import moment from 'moment';
import styles from 'styles/styles.scss';

export default [
  {
    title: 'Transaction #',
    dataIndex: 'id',
    render: id => <span style={{ textTransform: 'none' }}>{id}</span>,
  },
  {
    title: 'Template',
    dataIndex: 'template',
    render: template => (
      <span className={styles.templateActive}>{template}</span>
    ),
  },
  {
    title: 'From Sender',
    dataIndex: 'fromsender',
    render: sender => (
      <span style={{ textTransform: 'lowercase' }}>{sender}</span>
    ),
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
      <span className={styles.date}>{moment(date).format('MMM Do, YYYY')}</span>
    ),
  },
];

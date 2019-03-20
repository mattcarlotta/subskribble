import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import { upperCase } from 'utils';
import styles from 'styles/styles.scss';

const SUB = {
  active: 'person',
  inactive: 'person_outline',
  late: 'warning',
  suspended: 'do_not_disturb',
};

export default [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`${styles.materialIcons} ${styles[status]}`}>
          {SUB[status]}
        </i>
      </Tooltip>
    ),
  },
  {
    title: 'Subscriber',
    dataIndex: 'subscriber',
    render: (subscriber, { status }) => (
      <span className={styles[`subscriber${upperCase(status)}`]}>
        {subscriber}
      </span>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: email => <span style={{ textTransform: 'none ' }}>{email}</span>,
  },
  { title: 'Plan', dataIndex: 'planname' },
  {
    title: 'End Date',
    dataIndex: 'enddate',
    render: (date, { status }) => (
      <span className={styles[`enddate${upperCase(status)}`]}>
        {moment(date).format('MMM Do, YYYY')}
      </span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (amount, { status }) => (
      <span className={styles[`amount${upperCase(status)}`]}>${amount}</span>
    ),
  },
];

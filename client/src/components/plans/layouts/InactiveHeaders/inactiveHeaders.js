import React from 'react';
import { Tooltip } from 'antd';
import styles from 'styles/styles.scss';

export default [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`${styles.materialIcons} ${styles[status]}`}>
          content_paste
        </i>
      </Tooltip>
    ),
  },
  {
    title: 'Plan',
    dataIndex: 'planname',
    render: planname => (
      <span className={styles.planSuspended}>{planname}</span>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: amount => <span className={styles.amountSuspended}>${amount}</span>,
  },
  {
    title: 'Setup Fee',
    dataIndex: 'setupfee',
    render: fee => <span>{fee ? `$${fee}` : '-'}</span>,
  },
  { title: 'Description', dataIndex: 'description' },
  {
    title: 'Billing Frequency',
    dataIndex: 'billevery',
    render: bill => <span className={styles.billSuspended}>{bill}</span>,
  },
  {
    title: 'Trial Period',
    dataIndex: 'trialperiod',
    render: trial => <span>{trial || '-'}</span>,
  },
  {
    title: 'Subscribers',
    dataIndex: 'subscribers',
    render: subscribers => (
      <span className={styles.subscriberSuspended}>{subscribers}</span>
    ),
  },
];

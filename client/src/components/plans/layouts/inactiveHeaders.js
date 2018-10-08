import React from 'react';
import { Tooltip } from 'antd';

export default [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`material-icons ${status}`}>content_paste</i>
      </Tooltip>
    ),
  },
  {
    title: 'Plan',
    dataIndex: 'planname',
    render: planname => <span className="plan-suspended">{planname}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: amount => <span className="amount-suspended">${amount}</span>,
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
    render: bill => <span className="bill-suspended">{bill}</span>,
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
      <span className="subscriber-suspended">{subscribers}</span>
    ),
  },
];

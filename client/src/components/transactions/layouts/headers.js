import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';

const PAYMENTS = {
  credit: 'local_atm',
  due: 'assignment_late',
  paid: 'account_balance',
  refund: 'attach_money',
};

const HEADERS = [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`material-icons ${status}`}>{PAYMENTS[status]}</i>
      </Tooltip>
    ),
  },
  {
    title: 'Invoice #',
    dataIndex: 'invoice',
    render: (invoice, { status }) => (
      <span style={{ textTransform: 'none' }} className={`invoice-${status}`}>
        {invoice}
      </span>
    ),
  },
  { title: 'Plan', dataIndex: 'planname' },
  {
    title: 'Email',
    dataIndex: 'email',
    render: email => (
      <span style={{ textTransform: 'lowercase' }}>{email}</span>
    ),
  },
  {
    title: 'Subscriber',
    dataIndex: 'subscriber',
    render: (subscriber, { status }) => (
      <span className={`subscriber-${status}`}>{subscriber}</span>
    ),
  },
  {
    title: 'Processor',
    dataIndex: 'processor',
    render: proc => <span>{proc || '-'}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (amount, { status }) => (
      <span className={`amount-${status}`}>${amount}</span>
    ),
  },
];

export const CHARGEHEADERS = [
  ...HEADERS,
  {
    title: 'Charge Date',
    dataIndex: 'chargedate',
    render: date => (
      <span>{date ? moment(date).format('MMM Do, YYYY') : '-'}</span>
    ),
  },
];

export const REFUNDHEADERS = [
  ...HEADERS,
  {
    title: 'Refund Date',
    dataIndex: 'refunddate',
    render: date => <span>{moment(date).format('MMM Do, YYYY')}</span>,
  },
];

import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';

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
        <i className={`material-icons ${status}`}>{SUB[status]}</i>
      </Tooltip>
    ),
  },
  {
    title: 'Subscriber',
    dataIndex: 'subscriber',
    render: subscriber => <span className="subscriber">{subscriber}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    render: email => <span style={{ textTransform: 'none ' }}>{email}</span>,
  },
  { title: 'Credits', dataIndex: 'credits' },
  { title: 'Plan', dataIndex: 'planname' },
  {
    title: 'Start Date',
    dataIndex: 'startdate',
    render: date => <span>{moment(date).format('MMM Do, YYYY')}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: amount => <span className="amount">${amount}</span>,
  },
];

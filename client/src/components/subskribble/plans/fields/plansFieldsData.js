import React from 'react';

export const ACTIVEPLANS = [
  {
    key: '1',
    id: 'EvJdcd234534dsdf322f2',
    planName: 'Carlotta Prime',
    amount: '$29.99',
    setupFee: '$0.00',
    billEvery: '30 days',
    trialPeriod: '7 days',
    subscribers: '92'
  }
];

export const INACTIVEPLANS = [
  {
    key: '1',
    id: 'FDedfsdf158sfd255sdf1',
    planName: 'Carlotta Digital Advertisements',
    amount: '$79.99',
    setupFee: '$9.99',
    billEvery: '30 days',
    trialPeriod: '30 days',
    subscribers: '30'
  }
]

export const TABLEHEADERS = [
  {title: 'Name', dataIndex: 'planName'},
  {title: 'Amount', dataIndex: 'amount'},
  {title: 'Setup Fee', dataIndex: 'setupFee'},
  {title: 'Bill Every', dataIndex: 'billEvery'},
  {title: 'Trial Period', dataIndex: 'trialPeriod'},
  {title: 'Subscribers', dataIndex: 'subscribers', render: subscribers => <span className="subscription-count">{subscribers}</span>}
];

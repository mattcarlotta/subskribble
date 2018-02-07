import React from 'react';

export const CHARGES = [
  {
    key: '1',
    id: 'asdfd34345rfdgg34',
    status: 'paid',
    invoice: '#5892214',
    subscriber: 'Sherry Waters',
    processor: 'paypal',
    amount: '$29.99',
    chargeDate: 'Dec 2, 2017',
  },
  {
    key: '2',
    id: '34t4sdgfsddse4334',
    status: 'late',
    invoice: '#5892216',
    subscriber: 'Bob Aronssen',
    processor: 'visa checkout',
    amount: '$29.99',
    chargeDate: 'Dec 9, 2017',
  },
  {
    key: '3',
    id: 'rree5243t345rrr444',
    status: 'late',
    invoice: '#5892221',
    subscriber: 'Shaniqua Smith',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 10, 2017',
  },
  {
    key: '4',
    id: 'dfg5y465gfjuj56yu65',
    status: 'paid',
    invoice: '#5892230',
    subscriber: 'Tanya Ballschin',
    processor: 'venmo',
    amount: '$29.99',
    chargeDate: 'Dec 11, 2017',
  },
  {
    key: '5',
    id: '23rsdf576uughjhj454',
    status: 'paid',
    invoice: '#5892242',
    subscriber: 'Siemen Walker',
    processor: 'stripe',
    amount: '$29.99',
    chargeDate: 'Dec 16, 2017',
  },
  {
    key: '6',
    id: 'ttrrt45645454542322',
    status: 'paid',
    invoice: '#5892256',
    subscriber: 'Jerry Lamar',
    processor: 'paypal',
    amount: '$29.99',
    chargeDate: 'Dec 22, 2017',
  }
];

export const REFUNDS = [
  {
    key: '1',
    id: 're_1BJvYiIOTIzpR6RKunhzsbWZ',
    type: 'refund',
    subscriber: 'Mark Canelo',
    processor: 'visa checkout',
    amount: '$29.99',
    refundDate: 'Dec 12, 2017',
  },
  {
    key: '2',
    id: 're_2CJcHca64yvnmD1YHpvxsdkLT',
    type: 'credit',
    subscriber: 'Axle Root',
    processor: 'paypal',
    amount: '$29.99',
    refundDate: 'Dec 17, 2017',
  }
]

export const CHARGESTABLEHEADERS = [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => <span className={`label ${status}`}> {status}</span>
  },
  {
    title: 'Invoice',
    dataIndex: 'invoice',
  },
  {
    title: 'Subscriber',
    dataIndex: 'subscriber',
  },
  {
    title: 'Processor',
    dataIndex: 'processor',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Charge Date',
    dataIndex: 'chargeDate',
  }
];

export const REFUNDSTABLEHEADERS = [
  {
    title: 'Type',
    dataIndex: 'type',
    render: type => <span className={`label ${type}`}> {type}</span>
  },
  {
    title: 'Transaction ID',
    dataIndex: 'id',
  },
  {
    title: 'Subscriber',
    dataIndex: 'subscriber',
  },
  {
    title: 'Processor',
    dataIndex: 'processor',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Refund Date',
    dataIndex: 'refundDate',
  }
];

import React from 'react';

export const ACTIVESUBSCRIPTIONS = [
  {
    key: '1',
    id: 'ee2333ddf3sddfdf33e',
    status: 'active',
    subscriber: 'Sherry Waters',
    plan: 'Carlotta Prime',
    startDate: 'Dec 2, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    key: '2',
    id: 'bggr3343446fjner45',
    status: 'active',
    subscriber: 'Bob Aronssen',
    plan: 'Carlotta Prime',
    startDate: 'Dec 9, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    key: '3',
    id: '3355errfg434fdmkomkl',
    status: 'active',
    subscriber: 'Shaniqua Smith',
    plan: 'Carlotta Prime',
    startDate: 'Dec 10, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    key: '4',
    id: 'tyghjdgfj3488444fff',
    status: 'active',
    subscriber: 'Tanya Ballschin',
    plan: 'Carlotta Prime',
    startDate: 'Dec 11, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    key: '5',
    id: 'logrh05kgfm94mgfvf45',
    status: 'active',
    subscriber: 'Siemen Walker',
    plan: 'Carlotta Prime',
    startDate: 'Dec 16, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    key: '6',
    id: '45igtrn345nmgm34t844',
    status: 'active',
    subscriber: 'Jerry Lamar',
    plan: 'Carlotta Prime',
    startDate: 'Dec 22, 2017',
    endDate: '-',
    amount: '$29.99'
  }
];

export const INACTIVESUBSCRIPTIONS = [
  {
    key: '1',
    id: 'yyuiy58i0345t90i9045',
    status: 'inactive',
    subscriber: 'Carl Sagan',
    plan: 'Carlotta Prime',
    startDate: 'Dec 3, 2017',
    endDate: 'Jan 3, 2018',
    amount: '$29.99'
  },
  {
    key: '2',
    id: '4545yti45ty8i45t9455',
    status: 'inactive',
    subscriber: 'Mark Canelo',
    plan: 'Carlotta Prime',
    startDate: 'Dec 12, 2017',
    endDate: 'Jan 12, 2018',
    amount: '$29.99'
  },
  {
    key: '3',
    id: 'gfrhki5ykgfhk588584b',
    status: 'suspended',
    subscriber: 'Axle Root',
    plan: 'Carlotta Prime',
    startDate: 'Dec 16, 2017',
    endDate: 'Jan 16, 2018',
    amount: '$29.99'
  },
  {
    key: '4',
    id: 'klgf945tdvmkfko00bfm',
    status: 'inactive',
    subscriber: 'Adamn Vicks',
    plan: 'Carlotta Prime',
    startDate: 'Dec 17, 2017',
    endDate: 'Jan 17, 2018',
    amount: '$29.99'
  },
  {
    key: '5',
    id: 'nmnmc3405tlglg054ldf',
    status: 'suspended',
    subscriber: 'Wes Walls',
    plan: 'Carlotta Prime',
    startDate: 'Dec 17, 2017',
    endDate: 'Jan 17, 2018',
    amount: '$29.99'
  },
  {
    key: '6',
    id: '59gglgf95ldfkfkg00hl0',
    status: 'suspended',
    subscriber: 'Alisha Tallis',
    plan: 'Carlotta Prime',
    startDate: 'Dec 17, 2017',
    endDate: 'Jan 17, 2018',
    amount: '$29.99'
  },
]

export const TABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Plan', dataIndex: 'plan' },
  { title: 'Start Date', dataIndex: 'startDate' },
  { title: 'End Date', dataIndex: 'endDate' },
  { title: 'Amount', dataIndex: 'amount' }
];

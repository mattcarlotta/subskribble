import { browserHistory } from 'react-router';

export const ACTIVESUBSCRIPTIONS = [
  {
    status: 'active',
    customer: 'Sherry Waters',
    plan: 'Carlotta Prime',
    startDate: 'Dec 2, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    status: 'active',
    customer: 'Bob Aronssen',
    plan: 'Carlotta Prime',
    startDate: 'Dec 9, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    status: 'active',
    customer: 'Shaniqua Smith',
    plan: 'Carlotta Prime',
    startDate: 'Dec 10, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    status: 'active',
    customer: 'Tanya Ballschin',
    plan: 'Carlotta Prime',
    startDate: 'Dec 11, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    status: 'active',
    customer: 'Siemen Walker',
    plan: 'Carlotta Prime',
    startDate: 'Dec 16, 2017',
    endDate: '-',
    amount: '$29.99'
  },
  {
    status: 'active',
    customer: 'Jerry Lamar',
    plan: 'Carlotta Prime',
    startDate: 'Dec 22, 2017',
    endDate: '-',
    amount: '$29.99'
  }
];

export const INACTIVESUBSCRIPTIONS = [
  {
    status: 'inactive',
    customer: 'Carl Sagan',
    plan: 'Carlotta Prime',
    startDate: 'Dec 3, 2017',
    endDate: 'Jan 3, 2018',
    amount: '$29.99'
  },
  {
    status: 'inactive',
    customer: 'Mark Canelo',
    plan: 'Carlotta Prime',
    startDate: 'Dec 12, 2017',
    endDate: 'Jan 12, 2018',
    amount: '$29.99'
  },
  {
    status: 'suspended',
    customer: 'Axle Root',
    plan: 'Carlotta Prime',
    startDate: 'Dec 16, 2017',
    endDate: 'Jan 16, 2018',
    amount: '$29.99'
  },
  {
    status: 'inactive',
    customer: 'Adamn Vicks',
    plan: 'Carlotta Prime',
    startDate: 'Dec 17, 2017',
    endDate: 'Jan 17, 2018',
    amount: '$29.99'
  },
  {
    status: 'suspended',
    customer: 'Wes Walls',
    plan: 'Carlotta Prime',
    startDate: 'Dec 17, 2017',
    endDate: 'Jan 17, 2018',
    amount: '$29.99'
  },
  {
    status: 'suspended',
    customer: 'Alisha Tallis',
    plan: 'Carlotta Prime',
    startDate: 'Dec 17, 2017',
    endDate: 'Jan 17, 2018',
    amount: '$29.99'
  },
]

export const ACTIVESUBSBUTTONS = [
  {
    label: "Add Subscription",
    onClickAction: () => browserHistory.push('/rocketboard/subscriptions/add-subscription')
  },
  {
    label: "Suspend Subscription",
    onClickAction: () => browserHistory.push('/rocketboard/subscriptions/suspend-subscription')
  },
  {
    label: "View Subscription",
    onClickAction: () => browserHistory.push('/rocketboard/subscriptions/view-subscription')
  }
]

export const INACTIVESUBSBUTTONS = [
  {
    label: "Remove Subscription",
    onClickAction: () => browserHistory.push('/rocketboard/subscriptions/remove-subscription')
  },
  {
    label: "View Subscription",
    onClickAction: () => browserHistory.push('/rocketboard/subscriptions/view-subscription')
  }
]

export const TABLEHEADERS = ['Status', 'Customer', 'Plan', 'Start Date', 'End Date', 'Amount'];

import { browserHistory } from 'react-router';

export const ACTIVEPLANS = [
  {
    name: 'Carlotta Prime',
    amount: '$29.99',
    setupFee: '$0.00',
    billEvery: '30 day(s)',
    trialPeriod: '7 day(s)',
    subs: '92'
  }
];

export const INACTIVEPLANS = [
  {
    name: 'Carlotta Digital Advertisements',
    amount: '$79.99',
    setupFee: '$9.99',
    billEvery: '30 day(s)',
    trialPeriod: '30 day(s)',
    subs: '30'
  }
]

export const ACTIVEPANELBUTTONS = [
  {
    className: 'btn-reposition f-l',
    label: "Add Plan",
    onClickAction: () => browserHistory.push('/rocketboard/plans/add-plan')
  },
  {
    className: 'btn-reposition f-l',
    label: "Suspend Plan",
    onClickAction: () => browserHistory.push('/rocketboard/plans/suspend-plan')
  },
  {
    className: 'btn-reposition f-l',
    label: "View Plan",
    onClickAction: () => browserHistory.push('/rocketboard/plans/view-plan')
  }
]

export const INACTIVEPANELBUTTONS = [
  {
    className: 'btn-reposition f-l',
    label: "Remove Plan",
    onClickAction: () => browserHistory.push('/rocketboard/plans/remove-plan')
  },
  {
    className: 'btn-reposition f-l',
    label: "View Plan",
    onClickAction: () => browserHistory.push('/rocketboard/plans/view-plan')
  }
]

export const TABLEHEADERS = ['Name', 'Amount', 'Setup Fee', 'Bill Every', 'Trial Period', 'Subscribers'];

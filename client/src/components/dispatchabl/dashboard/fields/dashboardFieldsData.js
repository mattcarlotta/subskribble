import { browserHistory } from 'react-router';

export const OVERVIEWROWS = [
  {
    subtitle: 'MRR',
    amount: '$2,054.11'
  },
  {
    subtitle: 'Payments Received',
    amount: '$568.13'
  },
  {
    subtitle: 'Unpaid Invoices',
    amount: '$1,485.98'
  },
  {
    subtitle: 'Net Revenue',
    amount: '$19,833.76',
    className: 'no-b-r'
  },
]

export const CUSTOMERBUTTONS = [
  {
    className: 'btn-reposition f-r',
    label: "Add Customer",
    onClickAction: () => browserHistory.push('/rocketboard/customers/add-customer')
  },
]

export const PLANBUTTONS = [
  {
    className: 'btn-reposition f-r',
    label: "Add Plan",
    onClickAction: () => browserHistory.push('/rocketboard/plans/add-plan')
  },
]

import React from 'react';

const TABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Plan', dataIndex: 'plan' },
  { title: 'Start Date', dataIndex: 'startdate' },
  { title: 'End Date', dataIndex: 'enddate' },
  { title: 'Amount', dataIndex: 'amount' }
];

export default (activesubscribers, inactivesubscribers) => {
  return [
    {
      FILTERFIELDLABEL: "Filter Active Subscriptions",
      FILTERFORM: "FilterActiveSubscriptions",
      SELECTFIELDITEMS: ['10', '20', '50', 'All'],
      TAB: "Active Subscribers",
      TABLECONTENTS: activesubscribers,
      TABLEHEADERS: TABLEHEADERS
    },
    {
      FILTERFIELDLABEL: "Filter Inactive Subscriptions",
      FILTERFORM: "FilterInactiveSubscriptions",
      SELECTFIELDITEMS: ['10', '20', '50', 'All'],
      TAB: "Inactive Subscribers",
      TABLECONTENTS: inactivesubscribers,
      TABLEHEADERS: TABLEHEADERS
    }
  ]
}

import React from 'react';

const TABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Plan', dataIndex: 'plan' },
  { title: 'Start Date', dataIndex: 'startdate' },
  { title: 'End Date', dataIndex: 'enddate' },
  { title: 'Amount', dataIndex: 'amount' }
];

export default (activesubs, activesubcount, inactivesubs, inactivesubcount) => {
  return [
    {
      FILTERFIELDLABEL: "Filter Active Subscriptions",
      FILTERFORM: "FilterActiveSubscriptions",
      SELECTFIELD: true,
      TAB: "Active Subscribers",
      TABLECONTENTS: activesubs,
      TABLERECORDS: activesubcount,
      TABLEHEADERS: TABLEHEADERS
    },
    {
      FILTERFIELDLABEL: "Filter Inactive Subscriptions",
      FILTERFORM: "FilterInactiveSubscriptions",
      SELECTFIELD: true,
      TAB: "Inactive Subscribers",
      TABLECONTENTS: inactivesubs,
      TABLERECORDS: inactivesubcount,
      TABLEHEADERS: TABLEHEADERS
    }
  ]
}

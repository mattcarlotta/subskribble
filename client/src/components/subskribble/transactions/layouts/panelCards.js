import React from 'react';

const CHARGESTABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Invoice', dataIndex: 'invoice' },
  { title: 'Plan', dataIndex: 'planname' },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Processor', dataIndex: 'processor' },
  { title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> },
  { title: 'Charge Date', dataIndex: 'chargedate' }
];

export const REFUNDSTABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Transaction ID', dataIndex: 'invoice' },
  { title: 'Plan', dataIndex: 'planname' },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Processor', dataIndex: 'processor' },
  { title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> },
  { title: 'Refund Date', dataIndex: 'refunddate'}
];

export default ({
  activeitems,
  activeitemcount,
  inactiveitems,
  inactiveitemcount,
  ...rest
}) => [
  {
    FILTERFIELDLABEL: "Filter Charges",
    FILTERFORM: "FilterCharges",
    SELECTFIELD: true,
    TAB: "Charges",
    TABLECONTENTS: activeitems,
    TABLEHEADERS: CHARGESTABLEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest
  },
  {
    FILTERFIELDLABEL: "Filter Refunds",
    FILTERFORM: "FilterRefunds",
    SELECTFIELD: true,
    TAB: "Refunds",
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: REFUNDSTABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest
  }
]

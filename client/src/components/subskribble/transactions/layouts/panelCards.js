import React from 'react';

const tableProps = () => [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Invoice #', dataIndex: 'invoice' },
  { title: 'Plan', dataIndex: 'planname' },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Processor', dataIndex: 'processor', render: proc => proc ? <span>{proc}</span> : <span style={{ marginLeft: 15 }}>-</span>  },
  { title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> }
];

const CHARGESTABLEHEADERS = [ ...tableProps(), { title: 'Charge Date', dataIndex: 'chargedate' } ];
const REFUNDSTABLEHEADERS = [ ...tableProps(), { title: 'Refund Date', dataIndex: 'refunddate'} ];

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

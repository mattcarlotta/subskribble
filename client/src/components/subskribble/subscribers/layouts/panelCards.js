import React from 'react';
import CustomerSignupForm from '../../../../containers/subskribble/forms/CustomerSignupForm';

const CUSTOMERBUTTONS = [{ className: 'centered', label: "Add Subscriber" }];

const TABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Plan', dataIndex: 'plan' },
  { title: 'Start Date', dataIndex: 'startdate' },
  { title: 'End Date', dataIndex: 'enddate', render: enddate => enddate ? <span>{enddate}</span> : <span style={{ marginLeft: 25 }}>-</span> },
  { title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> }
];

export default ({
  activeitems,
  activeitemcount,
  inactiveitems,
  inactiveitemcount,
  ...rest
}) => [
  {
    BUTTONFORM: CustomerSignupForm,
    BUTTONFORMTITLE: 'Customer Signup',
    CUSTOMBUTTONS: CUSTOMERBUTTONS,
    FILTERFIELDLABEL: "Filter Active Subscribers",
    FILTERFORM: "FilterActiveSubscriptions",
    SELECTFIELD: true,
    TAB: "Active Subscribers",
    TABLECONTENTS: activeitems,
    TABLEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest
  },
  {
    FILTERFIELDLABEL: "Filter Inactive Subscribers",
    FILTERFORM: "FilterInactiveSubscriptions",
    SELECTFIELD: true,
    TAB: "Inactive Subscribers",
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest
  }
]

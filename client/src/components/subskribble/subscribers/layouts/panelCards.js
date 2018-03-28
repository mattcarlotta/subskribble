import React from 'react';
import CustomerSignupForm from '../../../../containers/subskribble/forms/CustomerSignupForm';

const CUSTOMERBUTTONS = [{ className: 'centered', label: "Add Subscriber" }];

const ACTIVETABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Plan', dataIndex: 'plan' },
  { title: 'Start Date', dataIndex: 'startdate' },
  { title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> }
];

const INACTIVETABLEHEADERS = [
  { title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  { title: 'Subscriber', dataIndex: 'subscriber' },
  { title: 'Plan', dataIndex: 'plan' },
  { title: 'Start Date', dataIndex: 'startdate' },
  { title: 'End Date', dataIndex: 'enddate', render: enddate => <span>{enddate}</span> },
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
    TABLEHEADERS: ACTIVETABLEHEADERS,
    TABLERECORDS: activeitemcount,
    ...rest
  },
  {
    FILTERFIELDLABEL: "Filter Inactive Subscribers",
    FILTERFORM: "FilterInactiveSubscriptions",
    SELECTFIELD: true,
    TAB: "Inactive Subscribers",
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: INACTIVETABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    ...rest
  }
]

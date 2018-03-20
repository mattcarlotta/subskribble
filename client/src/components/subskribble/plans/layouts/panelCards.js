import React from 'react';
// import AddNewPlan from '../../../../containers/subskribble/forms/AddNewPlan';
// import { TABLEHEADERS } from '../fields/plansFieldsData';

export const TABLEHEADERS = [
  {title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  {title: 'Name', dataIndex: 'planname'},
  {title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> },
  {title: 'Setup Fee', dataIndex: 'setupfee', render: fee => <span>${fee}</span> },
  {title: 'Bill Every', dataIndex: 'billevery'},
  {title: 'Trial Period', dataIndex: 'trialperiod'},
  {title: 'Subscribers', dataIndex: 'subscribers', render: subscribers => <span className="subscription-count">{subscribers}</span>}
];

export default ({
  activeitems,
  activeitemcount,
  deleteAction,
  fetchAction,
  inactiveitems,
  inactiveitemcount,
  updateAction
}) => [
  {
    deleteAction,
    fetchAction,
    FILTERFIELDLABEL: "Filter Active Plans",
    FILTERFORM: "FilterActivePlans",
    SELECTFIELD: true,
    TAB: "Active Plans",
    TABLECONTENTS: activeitems,
    TABLEHEADERS: TABLEHEADERS,
    TABLERECORDS: activeitemcount,
    updateAction
  },
  {
    deleteAction,
    fetchAction,
    FILTERFIELDLABEL: "Filter Inactive Plans",
    FILTERFORM: "FilterInactivePlans",
    SELECTFIELD: true,
    TAB: "Inactive Plans",
    TABLECONTENTS: inactiveitems,
    TABLEHEADERS: TABLEHEADERS,
    TABLERECORDS: inactiveitemcount,
    updateAction
  }
]

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
  activeplans,
  activeplancount,
  deletePlan,
  fetchNextPlans,
  inactiveplans,
  inactiveplancount,
  updatePlan
}) => [
  {
    deleteAction: deletePlan,
    fetchAction: fetchNextPlans,
    FILTERFIELDLABEL: "Filter Active Plans",
    FILTERFORM: "FilterActivePlans",
    SELECTFIELD: true,
    TAB: "Active Plans",
    TABLECONTENTS: activeplans,
    TABLEHEADERS: TABLEHEADERS,
    TABLERECORDS: activeplancount,
    updateAction: updatePlan
  },
  {
    deleteAction: deletePlan,
    fetchAction: fetchNextPlans,
    FILTERFIELDLABEL: "Filter Inactive Plans",
    FILTERFORM: "FilterInactivePlans",
    SELECTFIELD: true,
    TAB: "Inactive Plans",
    TABLECONTENTS: inactiveplans,
    TABLEHEADERS: TABLEHEADERS,
    TABLERECORDS: inactiveplancount,
    updateAction: updatePlan
  }
]

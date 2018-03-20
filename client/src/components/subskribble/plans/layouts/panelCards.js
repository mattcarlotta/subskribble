import React from 'react';
// import AddNewPlan from '../../../../containers/subskribble/forms/AddNewPlan';
// import { TABLEHEADERS } from '../fields/plansFieldsData';

export const TABLEHEADERS = [
  {title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span> },
  {title: 'Name', dataIndex: 'planname'},
  {title: 'Amount', dataIndex: 'amount'},
  {title: 'Setup Fee', dataIndex: 'setupfee'},
  {title: 'Bill Every', dataIndex: 'billevery'},
  {title: 'Trial Period', dataIndex: 'trialperiod'},
  {title: 'Subscribers', dataIndex: 'subscribers', render: subscribers => <span className="subscription-count">{subscribers}</span>}
];

export default ({
  activeplans,
  activeplancount,
  inactiveplans,
  inactiveplancount
}) => {
  return [
    {
      FILTERFIELDLABEL: "Filter Active Plans",
      FILTERFORM: "FilterActivePlans",
      SELECTFIELD: true,
      TAB: "Active Plans",
      TABLECONTENTS: activeplans,
      TABLEHEADERS: TABLEHEADERS,
      TABLERECORDS: activeplancount
    },
    {
      FILTERFIELDLABEL: "Filter Inactive Plans",
      FILTERFORM: "FilterInactivePlans",
      SELECTFIELD: true,
      TAB: "Inactive Plans",
      TABLECONTENTS: inactiveplans,
      TABLEHEADERS: TABLEHEADERS,
      TABLERECORDS: inactiveplancount
    }
  ]
};

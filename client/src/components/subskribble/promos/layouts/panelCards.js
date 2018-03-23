import React from 'react';

const TABLEHEADERS = [
  {title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span>},
  {title: 'Name', dataIndex: 'promocode'},
  {title: 'Amount', dataIndex: 'amount'},
  {title: 'Start Date', dataIndex: 'startdate'},
  {title: 'Valid For', dataIndex: 'validfor'},
  {title: 'Max Usage', dataIndex: 'maxusage', render: usage => <span className="max-usage"> {usage}</span>},
  {title: 'Total Usage', dataIndex: 'totalusage', render: usage => <span className="total-usage"> {usage}</span>}
];

export default ({
  activeitems,
  activeitemcount,
  inactiveitems,
  inactiveitemcount,
  ...rest
}) => [
  {
    FILTERFIELDLABEL: "Filter Active Promotionals",
    FILTERFORM: "FilterActivePromos",
    SELECTFIELD: true,
    TAB: "Active Promotionals",
    TABLECONTENTS: activeitems,
    TABLERECORDS: activeitemcount,
    TABLEHEADERS: TABLEHEADERS,
    ...rest
  },
  {
    FILTERFIELDLABEL: "Filter Inactive Promotionals",
    FILTERFORM: "FilterInactivePlans",
    SELECTFIELD: true,
    TAB: "Inactive Promotionals",
    TABLECONTENTS: inactiveitems,
    TABLERECORDS: inactiveitemcount,
    TABLEHEADERS: TABLEHEADERS,
    ...rest
  }
]

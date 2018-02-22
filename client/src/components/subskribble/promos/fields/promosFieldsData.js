import React from 'react';

export const  ACTIVECAMPAIGNS = [
  {
    key: '1',
    id: '34wewer234834284r8vsdn',
    status: 'active',
    promoName: '20PERCENTOFF',
    amount: '20%',
    maxUsage: 100,
    totalUsage: 19,
  }
];

export const  INACTIVECAMPAIGNS = [
  {
    key: '1',
    id: '24r9gf8dgfungf83234rdf',
    status: 'inactive',
    promoName: '40PERCENTOFF',
    amount: '40%',
    maxUsage: 50,
    totalUsage: 50,
  }
]

export const TABLEHEADERS = [
  {title: 'Status', dataIndex: 'status', render: status => <span className={`label ${status}`}> {status}</span>},
  {title: 'Name', dataIndex: 'promoName'},
  {title: 'Amount', dataIndex: 'amount'},
  {title: 'Max Usage', dataIndex: 'maxUsage', render: usage => <span className="max-usage"> {usage}</span>},
  {title: 'Total Usage', dataIndex: 'totalUsage', render: usage => <span className="total-usage"> {usage}</span>}
];

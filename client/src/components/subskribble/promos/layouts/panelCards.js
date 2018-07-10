import React from 'react';
import { Tooltip } from 'antd';

const TABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>new_releases</i>
			</Tooltip>
		)
	},
	{ title: 'Promo Code', dataIndex: 'promocode' },
	{ title: 'Associated Plan', dataIndex: 'planname' },
	{ title: 'Amount', dataIndex: 'amount' },
	{ title: 'Start Date', dataIndex: 'startdate' },
	{ title: 'Valid For', dataIndex: 'validfor' },
	{
		title: 'Max Usage',
		dataIndex: 'maxusage',
		render: usage => <span className="max-usage"> {usage}</span>
	},
	{
		title: 'Total Usage',
		dataIndex: 'totalusage',
		render: usage => <span className="total-usage"> {usage}</span>
	}
];

export default ({
	activeitems,
	activeitemcount,
	inactiveitems,
	inactiveitemcount,
	...rest
}) => [
	{
		SELECTFIELD: true,
		TAB: 'Active Promotionals',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Add Promo',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Promotionals',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

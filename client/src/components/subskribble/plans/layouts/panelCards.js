import React from 'react';
import { Tooltip } from 'antd';

export const TABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>content_paste</i>
			</Tooltip>
		)
	},
	{ title: 'Name', dataIndex: 'planname' },
	{
		title: 'Amount',
		dataIndex: 'amount',
		render: amount => <span>${amount}</span>
	},
	{
		title: 'Setup Fee',
		dataIndex: 'setupfee',
		render: fee => <span>${fee}</span>
	},
	{ title: 'Bill Every', dataIndex: 'billevery' },
	{ title: 'Trial Period', dataIndex: 'trialperiod' },
	{
		title: 'Subscribers',
		dataIndex: 'subscribers',
		render: subscribers => (
			<span className="subscription-count">{subscribers}</span>
		)
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
		TAB: 'Active Plans',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Add Plan',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Plans',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

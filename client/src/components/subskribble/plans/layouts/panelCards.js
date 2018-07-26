import React from 'react';
import { Tooltip } from 'antd';

export const ACTIVETABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>content_paste</i>
			</Tooltip>
		)
	},
	{
		title: 'Plan',
		dataIndex: 'planname',
		render: planname => <span className="plan">{planname}</span>
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		render: amount => <span className="amount">${amount}</span>
	},
	{
		title: 'Setup Fee',
		dataIndex: 'setupfee',
		render: fee => <span>{fee ? `$${fee}`: '-'}</span>
	},
	{ title: 'Description', dataIndex: 'description' },
	{
		title: 'Billing Frequency',
		dataIndex: 'billevery',
		render: bill => <span className="bill">{bill}</span>
	},
	{
		title: 'Trial Period',
		dataIndex: 'trialperiod',
		render: trial => <span>{trial ? trial : '-'}</span>
	},
	{
		title: 'Subscribers',
		dataIndex: 'subscribers',
		render: subscribers => (
			<span className="subscription-count">{subscribers}</span>
		)
	}
];

export const INACTIVETABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>content_paste</i>
			</Tooltip>
		)
	},
	{
		title: 'Plan',
		dataIndex: 'planname',
		render: planname => <span className="plan-suspended">{planname}</span>
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		render: amount => <span className="amount-suspended">${amount}</span>
	},
	{
		title: 'Setup Fee',
		dataIndex: 'setupfee',
		render: fee => <span>{fee ? `$${fee}`: '-'}</span>
	},
	{ title: 'Description', dataIndex: 'description' },
	{
		title: 'Billing Frequency',
		dataIndex: 'billevery',
		render: bill => <span className="bill-suspended">{bill}</span>
	},
	{
		title: 'Trial Period',
		dataIndex: 'trialperiod',
		render: trial => <span>{trial ? trial : '-'}</span>
	},
	{
		title: 'Subscribers',
		dataIndex: 'subscribers',
		render: subscribers => <span className="subscriber-suspended">{subscribers}</span>
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
		editLocation: 'plans',
		SELECTFIELD: true,
		TAB: 'Active Plans',
		TABLECONTENTS: activeitems,
		TABLEHEADERS: ACTIVETABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Add Plan',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Plans',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS: INACTIVETABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

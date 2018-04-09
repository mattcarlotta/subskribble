import React from 'react';
import { Tooltip } from 'antd';
// import AddNewPlan from '../../../../containers/subskribble/forms/AddNewPlan';
// import { TABLEHEADERS } from '../fields/plansFieldsData';

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
		FILTERFIELDLABEL: 'Filter Active Plans',
		FILTERFORM: 'FilterActivePlans',
		SELECTFIELD: true,
		TAB: 'Active Plans',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		...rest
	},
	{
		FILTERFIELDLABEL: 'Filter Inactive Plans',
		FILTERFORM: 'FilterInactivePlans',
		SELECTFIELD: true,
		TAB: 'Inactive Plans',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

import React from 'react';
import { Tooltip } from 'antd';
import { browserHistory } from 'react-router';

const buttonAction = () => browserHistory.push('/subskribble/promotionals/create');

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
	{ title: 'Name', dataIndex: 'promocode' },
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
		buttonAction,
		buttonIcon: 'playlist_add',
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

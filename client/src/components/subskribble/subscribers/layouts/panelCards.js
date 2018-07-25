import React from 'react';
import { Tooltip } from 'antd';

const SUB = {
	active: 'person',
	inactive: 'person_outline',
	late: 'warning',
	suspended: 'do_not_disturb'
};

const renderStatus = status => (
	<Tooltip placement="bottom" title={status}>
		<i className={`material-icons ${status}`}>{SUB[status]}</i>
	</Tooltip>
);

const ACTIVETABLEHEADERS = [
	{ title: 'Status', dataIndex: 'status', render: status => renderStatus(status) },
	{
		title: 'Subscriber',
		dataIndex: 'subscriber',
		render: subscriber => <span className="subscriber">{subscriber}</span>
	},
	{ title: 'Plan', dataIndex: 'planname' },
	{ title: 'Start Date', dataIndex: 'startdate' },
	{	title: 'Amount', dataIndex: 'amount', render: amount => <span className="amount">${amount}</span> }
];

const INACTIVETABLEHEADERS = [
	{ title: 'Status', dataIndex: 'status', render: status => renderStatus(status) },
	{
		title: 'Subscriber',
		dataIndex: 'subscriber',
		render: (subscriber, {status}) => <span className={`subscriber-${status}`}>{subscriber}</span>
	},
	{ title: 'Plan', dataIndex: 'planname' },
	{ title: 'Start Date', dataIndex: 'startdate' },
	{
		title: 'End Date',
		dataIndex: 'enddate',
		render: (enddate, {status}) => <span className={`enddate-${status}`}>{enddate}</span>
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
		TAB: 'Active Subscribers',
		TABLECONTENTS: activeitems,
		TABLEHEADERS: ACTIVETABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Add Subscriber',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Subscribers',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS: INACTIVETABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

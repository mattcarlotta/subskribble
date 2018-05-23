import React from 'react';
import { Tooltip } from 'antd';
import { browserHistory } from 'react-router';

const buttonAction = () => browserHistory.push('/subskribble/subscribers/register');

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
	{ title: 'Subscriber', dataIndex: 'subscriber' },
	{ title: 'Plan', dataIndex: 'planname' },
	{ title: 'Start Date', dataIndex: 'startdate' },
	{	title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> }
];

const INACTIVETABLEHEADERS = [
	{ title: 'Status', dataIndex: 'status', render: status => renderStatus(status) },
	{ title: 'Subscriber', dataIndex: 'subscriber' },
	{ title: 'Plan', dataIndex: 'planname' },
	{ title: 'Start Date', dataIndex: 'startdate' },
	{ title: 'End Date', dataIndex: 'enddate', render: enddate => <span>{enddate}</span> },
	{ title: 'Amount', dataIndex: 'amount', render: amount => <span>${amount}</span> }
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
		buttonLabel: 'Add Subscriber',
		SELECTFIELD: true,
		TAB: 'Active Subscribers',
		TABLECONTENTS: activeitems,
		TABLEHEADERS: ACTIVETABLEHEADERS,
		TABLERECORDS: activeitemcount,
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

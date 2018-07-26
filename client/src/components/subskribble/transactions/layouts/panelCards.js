import React from 'react';
import { Tooltip } from 'antd';

const PAYMENTS = {
	credit: 'credit_card',
	due: 'assignment_late',
	paid: 'payment',
	refund: 'account_balance'
};

const TABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status =>
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>{PAYMENTS[status]}</i>
			</Tooltip>
	},
	{
		title: 'Invoice #',
		dataIndex: 'invoice',
		render: (invoice, {status}) => <span className={`invoice-${status}`}>{invoice}</span>
	},
	{ title: 'Plan', dataIndex: 'planname' },
	{
		title: 'Subscriber',
		dataIndex: 'subscriber',
		render: (subscriber, {status}) => <span className={`subscriber-${status}`}>{subscriber}</span>
	},
	{
		title: 'Processor',
		dataIndex: 'processor',
		render: proc => <span>{proc ? proc : '-'}</span>
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		render: (amount, {status}) => <span className={`amount-${status}`}>${amount}</span>
	},
	{ title: 'Charge Date', dataIndex: 'chargedate' }
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
		TAB: 'Charges',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Refunds',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

import React from 'react';
import { Tooltip } from 'antd';

const PAYMENTS = {
	credit: 'credit_card',
	due: 'assignment_late',
	paid: 'payment',
	refund: 'account_balance'
};

const tableProps = () => [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>{PAYMENTS[status]}</i>
			</Tooltip>
		)
	},
	{
		title: 'Invoice #',
		dataIndex: 'invoice',
		render: invoice => <span className="lowercase">{invoice}</span>
	},
	{ title: 'Plan', dataIndex: 'planname' },
	{ title: 'Subscriber', dataIndex: 'subscriber' },
	{
		title: 'Processor',
		dataIndex: 'processor',
		render: proc =>
			proc ? <span>{proc}</span> : <span style={{ marginLeft: 15 }}>-</span>
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		render: amount => <span>${amount}</span>
	}
];

const CHARGESTABLEHEADERS = [
	...tableProps(),
	{ title: 'Charge Date', dataIndex: 'chargedate' }
];
const REFUNDSTABLEHEADERS = [
	...tableProps(),
	{ title: 'Refund Date', dataIndex: 'refunddate' }
];

export default ({
	activeitems,
	activeitemcount,
	inactiveitems,
	inactiveitemcount,
	...rest
}) => [
	{
		FILTERFIELDLABEL: 'Filter Charges',
		FILTERFORM: 'FilterCharges',
		SELECTFIELD: true,
		TAB: 'Charges',
		TABLECONTENTS: activeitems,
		TABLEHEADERS: CHARGESTABLEHEADERS,
		TABLERECORDS: activeitemcount,
		...rest
	},
	{
		FILTERFIELDLABEL: 'Filter Refunds',
		FILTERFORM: 'FilterRefunds',
		SELECTFIELD: true,
		TAB: 'Refunds',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS: REFUNDSTABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

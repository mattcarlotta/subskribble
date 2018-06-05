import React from 'react';
import { Tooltip } from 'antd';

const TABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>content_copy</i>
			</Tooltip>
		)
	},
	{ title: 'Name', dataIndex: 'promocode' },
	{ title: 'Gateway', dataIndex: 'gateway' },
	{ title: 'Unique Id', dataIndex: 'unqiueid' },
	{ title: 'Plans', dataIndex: 'plans' }
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
		TAB: 'Active Forms',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Create Form',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Forms',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

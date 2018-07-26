import React from 'react';
import { Tooltip } from 'antd';

const SUB = {
	active: 'person',
	inactive: 'person_outline',
	late: 'warning',
	suspended: 'do_not_disturb'
};

export default [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status =>
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>{SUB[status]}</i>
			</Tooltip>
	},
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

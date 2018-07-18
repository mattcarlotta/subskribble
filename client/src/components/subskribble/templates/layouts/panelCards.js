import map from 'lodash/map';
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
	{ title: 'Template Name', dataIndex: 'templatename' },
	{
		title: 'From Sender',
		dataIndex: 'fromsender',
		render: sender => (<span style={{ textTransform: 'lowercase' }}>{sender}</span>)
	},
	{
    title: 'Associated Plans',
    dataIndex: 'plans',
    render: plans => (
      <span>
        { map(plans, (name, key) => (
          name
          ? <span key={key}>{name}{ key < plans.length-1 && ', '}
            </span>
          : <span key={key} style={{ textTransform: 'lowercase', color: 'rgba(0,0,0,.45)' }}>
              (none)
            </span>
        ))}
      </span>
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
		editLocation: 'templates',
		SELECTFIELD: true,
		TAB: 'Active Templates',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Create Form',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Templates',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

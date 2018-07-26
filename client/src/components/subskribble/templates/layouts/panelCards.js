import map from 'lodash/map';
import React from 'react';
import { Tooltip } from 'antd';

const TABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status =>
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>content_copy</i>
			</Tooltip>
	},
	{
		title: 'Template Name',
		dataIndex: 'templatename',
		render: (template, {status}) => <span className={`template-${status}`}>{template}</span>
	},
	{
		title: 'From Sender',
		dataIndex: 'fromsender',
		render: sender => <span className="lowercase">{sender}</span>
	},
	{ title: 'Subject', dataIndex: 'subject' },
	{
    title: 'Associated Plans',
    dataIndex: 'plans',
    render: (plans, {status}) => (
      <span>
        { map(plans, (name, key) => (
          name
          ? <span className={`plans-${status}`} key={key}>{name}</span>
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

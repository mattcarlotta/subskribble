import map from 'lodash/map';
import React from 'react';
import { Tooltip } from 'antd';

export default [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`material-icons ${status}`}>content_copy</i>
      </Tooltip>
    ),
  },
  {
    title: 'Template Name',
    dataIndex: 'templatename',
    render: (template, { status }) => (
      <span className={`template-${status}`}>{template}</span>
    ),
  },
  {
    title: 'From Sender',
    dataIndex: 'fromsender',
    render: sender => <span className="lowercase">{sender}</span>,
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    render: subject => <span style={{ textTransform: 'none' }}>{subject}</span>,
  },
  {
    title: 'Associated Plans',
    dataIndex: 'plans',
    render: (plans, { status }) => (
      <span>
        {map(
          plans,
          (name, key) =>
            name ? (
              <span className={`plans-${status}`} key={key}>
                {name}
              </span>
            ) : (
              <span
                key={key}
                style={{ textTransform: 'lowercase', color: 'rgba(0,0,0,.45)' }}
              >
                (none)
              </span>
            ),
        )}
      </span>
    ),
  },
];

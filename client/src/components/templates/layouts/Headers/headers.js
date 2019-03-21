import map from 'lodash/map';
import React from 'react';
import { Tooltip } from 'antd';
import { upperCase } from 'utils';
import styles from 'styles/styles.scss';

export default [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`${styles.materialIcons} ${styles[status]}`}>
          content_copy
        </i>
      </Tooltip>
    ),
  },
  {
    title: 'Template Name',
    dataIndex: 'templatename',
    render: (template, { status }) => (
      <span className={styles[`template${upperCase(status)}`]}>{template}</span>
    ),
  },
  {
    title: 'From Sender',
    dataIndex: 'fromsender',
    render: sender => (
      <span style={{ textTransform: 'lowercase' }}>{sender}</span>
    ),
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
              <span className={styles[`plans${upperCase(status)}`]} key={key}>
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

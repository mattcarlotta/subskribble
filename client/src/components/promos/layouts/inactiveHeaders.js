import map from 'lodash/map';
import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';

export default [
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <Tooltip placement="bottom" title={status}>
        <i className={`material-icons ${status}`}>new_releases</i>
      </Tooltip>
    ),
  },
  {
    title: 'Promo Code',
    dataIndex: 'promocode',
    render: promo => <span className="promo-suspended">{promo}</span>,
  },
  {
    title: 'Associated Plans',
    dataIndex: 'plans',
    render: plans => (
      <span>
        {map(
          plans,
          (name, key) =>
            name ? (
              <span key={key}>
                {name}
                {key < plans.length - 1 && ', '}
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
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (amount, { discounttype }) => (
      <span className="amount-suspended">
        {discounttype === '$'
          ? `${discounttype}${amount}`
          : `${amount}${discounttype}`}
      </span>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startdate',
    render: date => <span>{moment(date).format('MMM Do, YYYY')}</span>,
  },
  {
    title: 'End Date',
    dataIndex: 'enddate',
    render: date => <span>{moment(date).format('MMM Do, YYYY')}</span>,
  },
  {
    title: 'Max Usage',
    dataIndex: 'maxusage',
    render: usage => (
      <span className="max-usage-suspended">
        {usage === 2147483647 ? 'Unlimited' : usage}
      </span>
    ),
  },
  {
    title: 'Total Usage',
    dataIndex: 'totalusage',
    render: usage => <span className="total-usage-suspended"> {usage}</span>,
  },
];

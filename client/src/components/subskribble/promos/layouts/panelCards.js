import map from 'lodash/map';
import React from 'react';
import { Tooltip } from 'antd';

const TABLEHEADERS = [
	{
		title: 'Status',
		dataIndex: 'status',
		render: status => (
			<Tooltip placement="bottom" title={status}>
				<i className={`material-icons ${status}`}>new_releases</i>
			</Tooltip>
		)
	},
	{
		title: 'Promo Code',
		dataIndex: 'promocode',
		render: promo => <span className="promo">{promo}</span>
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
  },
	{
		title: 'Amount',
		dataIndex: 'amount',
		render: (amount, {discounttype}) => <span className="amount">{ (discounttype === '$') ? `${discounttype}${amount}` : `${amount}${discounttype}` }</span>
	},
	{ title: 'Start Date', dataIndex: 'startdate' },
	{ title: 'End Date', dataIndex: 'enddate' },
	{
		title: 'Max Usage',
		dataIndex: 'maxusage',
		render: usage => <span className="max-usage">{usage === 2147483647 ? 'Unlimited' : usage}</span>
	},
	{
		title: 'Total Usage',
		dataIndex: 'totalusage',
		render: usage => <span className="total-usage"> {usage}</span>
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
		editLocation: 'promotionals',
		SELECTFIELD: true,
		TAB: 'Active Promotionals',
		TABLECONTENTS: activeitems,
		TABLEHEADERS,
		TABLERECORDS: activeitemcount,
		tipTitle: 'Add Promo',
		...rest
	},
	{
		SELECTFIELD: true,
		TAB: 'Inactive Promotionals',
		TABLECONTENTS: inactiveitems,
		TABLEHEADERS,
		TABLERECORDS: inactiveitemcount,
		...rest
	}
];

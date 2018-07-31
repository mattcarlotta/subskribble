import map from 'lodash/map';
import React from 'react';
import { Icon, Menu } from 'antd';
const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu;

const TABS = [
	{ icon: 'dashboard', label: 'dashboard' },
	{ icon: 'people_outline', label: 'subscribers' },
	{ icon: 'content_paste', label: 'plans' },
	{ dividerLabel: 'Accounting', icon: 'new_releases', label: 'promotionals' },
	{ icon: 'payment', label: 'transactions' },
	{ dividerLabel: 'Networking', icon: 'mail_outline', label: 'messages' },
	{ icon: 'view_quilt', label: 'templates' }
]

export default (collapseSideNav) => (
	map(TABS, ({ dividerLabel, icon, label }) => (
		<MenuItemGroup
			key={label}
			title={ dividerLabel &&
				<span className="divider" style={{ display: collapseSideNav ? 'none' : '' }}>
					<hr className="divider" />
					<h6 className="divider-title">
						{dividerLabel}
					</h6>
				</span>
			}
		>
			<MenuItem style={{ margin: 0 }} key={label}>
				<Icon>
					<i className="material-icons menu-icon">{icon}</i>
				</Icon>
				<span className="menu-label">
					{label.charAt(0).toUpperCase()+label.slice(1)}
				</span>
			</MenuItem>
		</MenuItemGroup>
	))
)

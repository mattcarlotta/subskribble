import map from 'lodash/map';
import React, { Fragment } from 'react';
import { Icon, Menu } from 'antd';
const { Item: MenuItem, SubMenu } = Menu;

const ADMINMENU = [
	{ menuTitle: ['people_outline', 'Subscribers'], itemKey: 1, },
	{ menuTitle: ['content_paste', 'Plans'], itemKey: 6 },
	{ menuTitle: ['new_releases', 'Promotionals'], itemKey: 11 },
	{ menuTitle: ['payment', 'Transactions'], itemKey: 16 },
]

const showMenuTitle = (icon, title, className) => (
	<span>
		<Icon>
			<i className={`material-icons ${className}`}>{icon}</i>
		</Icon>
		<span>{title}</span>
	</span>
)

export default ({ handleTabClick }) => (
	<Fragment>
		<div key="menu-header" className="drawer-menu-header">
			<div className="title">admin panel</div>
		</div>
		<Menu
			key="menu-container"
			className="drawer-menu-container"
			onSelect={handleTabClick}
			mode="inline"
			selectedKeys={['0']}
		>
			{map(ADMINMENU, ({ menuTitle, itemKey }, key) => (
				<SubMenu key={`sub${key}`} title={showMenuTitle(...menuTitle, 'menu-title')}>
					<MenuItem key={itemKey}>{showMenuTitle('add', 'Create', 'menu-option')}</MenuItem>
					<MenuItem key={itemKey+1}>{showMenuTitle('delete', 'Delete', 'menu-option')}</MenuItem>
					<MenuItem key={itemKey+2}>{showMenuTitle('do_not_disturb', 'Suspend', 'menu-option')}</MenuItem>
					<MenuItem key={itemKey+3}>{showMenuTitle('settings_backup_restore', 'Activate', 'menu-option')}</MenuItem>
					<MenuItem key={itemKey+4}>{showMenuTitle('delete_sweep', 'Delete All', 'menu-option')}</MenuItem>
				</SubMenu>
			))}
		</Menu>
	</Fragment>
)

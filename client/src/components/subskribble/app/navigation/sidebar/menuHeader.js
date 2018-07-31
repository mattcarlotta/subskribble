import React from 'react';
import { Button } from 'antd';

export default ({ collapseSideNav, handleLogoClick}) => (
	<div key="menu-header" className="sider-menu-header">
		<Button onClick={handleLogoClick} className="logo-container">
			<i className="material-icons icon-logo">wifi_tethering</i>
			<span style={{ display: collapseSideNav ? 'none' : '' }} className="text-logo">subskribble</span>
		</Button>
	</div>
)

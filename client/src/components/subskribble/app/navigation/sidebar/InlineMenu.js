import React from 'react';
import { Layout, Menu } from 'antd';
import MenuHeader from './menuHeader';
import MenuTabs from './menuTabs';
const { Sider } = Layout;

export default ({ handleTabClick, collapseSideNav, selectedKey }) => {
  const handleLogoClick = () => handleTabClick({key:""});
  return (
    <Sider collapsible collapsed={collapseSideNav} trigger={null} width={235} >
      <MenuHeader collapseSideNav={collapseSideNav} handleLogoClick={handleLogoClick} />
      <Menu
        key="menu-container"
        className="sider-menu-container"
        mode="inline"
        selectedKeys={selectedKey}
        onSelect={handleTabClick}
      >
        {MenuTabs(collapseSideNav)}
      </Menu>
    </Sider>
  )
}

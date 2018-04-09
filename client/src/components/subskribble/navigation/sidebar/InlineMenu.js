import map from 'lodash/map';
import React from 'react';
import { Button, Icon, Layout, Menu } from 'antd';
import TABLINKS from '../links/tabLinks';

const { Sider } = Layout;
const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu;

const SideBar = ({
  handleTabClick,
  collapseSideNav,
  selectedKey
}) => {
  const handleLogoClick = () => handleTabClick({key:""});
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapseSideNav}
      style={{ height: '100vh' }}
      width={220}
    >
      <div key="menu-header" className="drawer-menu-header">
        <Button onClick={handleLogoClick} className="logo-container">
          <i className="material-icons icon-logo">wifi_tethering</i>
          <span style={{ display: collapseSideNav ? 'none' : '' }} className="text-logo">subskribble</span>
        </Button>
      </div>
      <Menu
        key="menu-container"
        className="drawer-menu-container"
        mode="inline"
        selectedKeys={selectedKey}
        onSelect={handleTabClick}
      >
        {map(TABLINKS, ({ dividerLabel, icon, label }) => (
          <MenuItemGroup
            key={label}
            title={ dividerLabel &&
              <h6 style={{ display: collapseSideNav ? 'none' : '' }} className="divider-title">
                {dividerLabel}
              </h6>
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
        ))}
      </Menu>
    </Sider>
  )
}


export default SideBar;

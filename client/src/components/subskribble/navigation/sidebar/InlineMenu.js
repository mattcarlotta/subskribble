import map from 'lodash/map';
import React from 'react';
import { browserHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import LeftNav from '../leftNav';
import TABLINKS from '../links/tabLinks';

const { Sider } = Layout;
const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu;

const SideBar = ({
  handleTabClick,
  collapseSideNav,
  selectedKey
}) => (
  <Sider
    trigger={null}
    collapsible
    collapsed={collapseSideNav}
    style={{ height: '100vh' }}
    width={240}
  >
    <div key="menu-header" className="drawer-menu-header">
      <LeftNav
        collapseSideNav={collapseSideNav}
        onClickAction={() => browserHistory.push('/subskribble')}
      />
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
          title={ dividerLabel && <h6 style={{ display: collapseSideNav ? 'none' : '' }} className="divider-title">{dividerLabel}</h6> }
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

export default SideBar;

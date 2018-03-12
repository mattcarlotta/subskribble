import map from 'lodash/map';
import React from 'react';
import { Menu } from 'antd';
import LeftNav from '../leftNav';
import TABLINKS from '../links/tabLinks';
const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu;

export default ({ handleMenuButton, handleMenuToggle, handleTabClick, selectedKey }) => [
  <div key="menu-header" className="drawer-menu-header">
    <LeftNav onClickAction={handleMenuToggle} />
    {handleMenuButton("close")}
  </div>,
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
        title={ dividerLabel && <h6 className="divider-title">{dividerLabel}</h6> }
      >
        <MenuItem style={{ margin: 0 }} key={label}>
          <i className="material-icons menu-icon">{icon}</i>
          <span className="menu-label">
            {label.charAt(0).toUpperCase()+label.slice(1)}
          </span>
        </MenuItem>
      </MenuItemGroup>
    ))}
  </Menu>
];

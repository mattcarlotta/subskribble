import map from 'lodash/map';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Layout, Menu } from 'antd';
import MenuHeader from './menuHeader';

const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu;
const { Sider } = Layout;
const TABS = [
  { icon: 'dashboard', key: 'dashboard', label: 'Dashboard' },
  { icon: 'people_outline', key: 'subscribers', label: 'Subscribers' },
  { icon: 'content_paste', key: 'plans', label: 'Plans' },
  {
    dividerLabel: 'Accounting',
    icon: 'new_releases',
    key: 'promotionals',
    label: 'Promotionals',
  },
  { icon: 'payment', key: 'transactions', label: 'Transactions' },
  {
    dividerLabel: 'Networking',
    icon: 'mail_outline',
    key: 'messages',
    label: 'Messages',
  },
  { icon: 'view_module', key: 'templates', label: 'Templates' },
];

const InlineMenu = ({ handleTabClick, collapseSideNav, selectedKey }) => (
  <Sider collapsible collapsed={collapseSideNav} trigger={null} width={235}>
    <MenuHeader
      collapseSideNav={collapseSideNav}
      handleLogoClick={handleTabClick}
    />
    <Menu
      key="menu-container"
      className="sider-menu-container"
      mode="inline"
      selectedKeys={selectedKey}
      onSelect={handleTabClick}
    >
      {map(TABS, ({ dividerLabel, icon, key, label }) => (
        <MenuItemGroup
          key={key}
          title={
            dividerLabel && (
              <span
                className="divider"
                style={{ display: collapseSideNav ? 'none' : '' }}
              >
                <hr className="divider" />
                <h6 className="divider-title">{dividerLabel}</h6>
              </span>
            )
          }
        >
          <MenuItem style={{ margin: 0 }} key={key}>
            <Icon>
              <i className="material-icons menu-icon">{icon}</i>
            </Icon>
            <span className="menu-label">{label}</span>
          </MenuItem>
        </MenuItemGroup>
      ))}
    </Menu>
  </Sider>
);

export default InlineMenu;

InlineMenu.propTypes = {
  collapseSideNav: PropTypes.bool.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  selectedKey: PropTypes.arrayOf(PropTypes.string),
};

import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
const { Item: MenuItem, SubMenu } = Menu;

const nestedMenuItems = (key, label, nestedItems) => (
  <SubMenu className={key !== 0 && "menu-item"} key={label} title={label}>
    {map(nestedItems, itemName => (
      <MenuItem key={itemName}>
        {itemName}
      </MenuItem>
    ))}
  </SubMenu>
)

export default ({
  dropDownLabel,
  handleDropMenu,
  nestedTabs,
  TABS
}) => (
  <Dropdown
    trigger={['click']}
    overlay={
      <Menu>
        {map(TABS, ({ link, label, nestedItems }, key) => (
          nestedItems
         ? nestedMenuItems(key, label, nestedItems)
         : <MenuItem className={key !== 0 && "menu-item"} key={key}>
               <Link to={link}>
                 {label}
               </Link>
             </MenuItem>
        ))}
      </Menu>
    }
    >
      <Link className="ant-dropdown-link">
        {dropDownLabel} <Icon type="down" />
      </Link>
  </Dropdown>
)

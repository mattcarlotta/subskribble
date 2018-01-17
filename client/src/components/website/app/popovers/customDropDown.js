import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
const { Item: MenuItem, SubMenu } = Menu;

const nestedMenuItems = (key, label, nestedItems) => {
  return (
    <SubMenu className={key !== 0 && "menu-item"} key={label} title={label}>
      {map(nestedItems, itemName => (
        <MenuItem key={itemName}>
          {itemName}
        </MenuItem>
      ))}
    </SubMenu>
  )
}

const CustomDropDown = ({
  dropDownLabel,
  handleDropMenu,
  nestedTabs,
  TABS
}) => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu>
          {
            map(TABS, ({ link, label, nestedItems }, key) => {
              return nestedItems
              ? nestedMenuItems(key, label, nestedItems)
              : <MenuItem className={key !== 0 && "menu-item"} key={key}>
                    <Link to={link}>
                      {label}
                    </Link>
                  </MenuItem>
            })
          }
        </Menu>
      }
      >
        <Link className="ant-dropdown-link">
          {dropDownLabel} <Icon type="down" />
        </Link>
    </Dropdown>
  )
}

export default CustomDropDown;

/*
{nestedTabs
  ? map(TABS, ({tab, nestedTabs}) => (
      <SubMenu key={tab}>
        <MenuItem>
          {tab}
        </MenuItem>
      </SubMenu>
    ))
  : map(TABS, ({ link, label }, key) => (
      <MenuItem key={key}>
        <Link to={link}>
          {label}
        </Link>
      </MenuItem>
    ))
}
*/

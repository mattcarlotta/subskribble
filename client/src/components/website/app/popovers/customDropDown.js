import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import { Menu, Dropdown, Icon } from 'antd';
const { Item: MenuItem, SubMenu } = Menu;

const nestedMenuItems = (label, nestedItems) => {
  return (
    <SubMenu key={label} title={label}>
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
      overlay={
        <Menu>
          {
            map(TABS, ({ link, label, nestedItems }, key) => {
              return nestedItems
              ? nestedMenuItems(label, nestedItems)
              : <MenuItem key={key}>
                    <Link to={link}>
                      {label}
                    </Link>
                  </MenuItem>
            })
          }
        </Menu>
      }
      trigger={['click']}
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

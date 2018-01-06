import map from 'lodash/map';
import React from 'react';
import { Link } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const CustomPopover = ({
  anchorEl,
  handleRequestClose,
  handleTabIcon,
  handleTouchTap,
  linkLabel,
  linkTabs,
  tabKey,
  tabOpen,
  TABS
}) => {
  return [
    <Link key={`${tabKey} Tab`} onClick={e => handleTouchTap(e, tabKey)}>
      { linkLabel }
      { handleTabIcon(tabOpen) }
    </Link>,
    <Popover
      key={`${tabKey} Items`}
      open={tabOpen}
      anchorEl={anchorEl}
      anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      onRequestClose={handleRequestClose}
      >
        <Menu>
          { linkTabs
            ? map(TABS, ({ link, label }) => {
              return (
                <Link key={label} onClick={handleRequestClose} to={link}>
                  <MenuItem primaryText={label} />
                </Link>
              )
            })
            : map(TABS, ({tab, nestedTabs}) => {
              return (
                <MenuItem
                  key={tab}
                  primaryText={tab}
                  rightIcon={(nestedTabs) ? <ArrowDropRight /> : null}
                  menuItems={(nestedTabs)
                    ? map(nestedTabs, tab => (<MenuItem key={tab} primaryText={tab} />))
                    : null
                  }
                />
              )
            })
          }
        </Menu>
      </Popover>
  ]
}

export default CustomPopover;

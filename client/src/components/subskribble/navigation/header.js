import React from 'react';
import { Row } from 'antd';
// import DashboardTabs from './Tabs';
import NavButton from './navButton';
import NotificationsButton from './notifications/NotificationButton';
import SettingsButton from './settings/SettingsButton';

const DashboardHeader = ({ collapseSideNav, handleMenuToggle }) => (
  <Row className="dash-nav-container">
    <div className="left-nav">
      <NavButton
        icon={collapseSideNav ? "format_indent_increase" : "format_indent_decrease"}
        onClickAction={handleMenuToggle}
        tooltip={collapseSideNav ? "Open Menu" : "Close Menu"}
      />
    </div>
    <div className="right-nav">
      <NotificationsButton />
      <SettingsButton />
    </div>
  </Row>
)

export default DashboardHeader;

import map from 'lodash/map';
import React from 'react';
import { Col, Row } from 'antd';
// import DashboardTabs from './Tabs';
import LeftNav from './leftNav';
import NavButton from './navButton';
import NabButtonLinks from './links/navButtonsLinks';
import RightNav from './rightNav';
import SideBar from './sidebar/SideBar';

const DashboardHeader = () => (
  <Row className="dash-nav-container">
    <Col span={12}>
      <LeftNav />
      {map(NabButtonLinks, (props, key) => (
        <NavButton key={key} {...props} />
      ))}
      <SideBar />
    </Col>
    <Col span={12}>
      <RightNav />
    </Col>
  </Row>
)

export default DashboardHeader;

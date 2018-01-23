import React from 'react';
import { Row, Col } from 'antd';
// import DashboardTabs from './Tabs';
import LeftNav from './leftNav';
import RightNav from './rightNav';
// import Sidebar from './Sidebar';

const DashboardHeader = () => (
  <Row className="dash-nav-container">
    <Col span={12}>
      {/* <Sidebar /> */}
      <LeftNav />
    </Col>
    <Col span={12}>
      <RightNav />
    </Col>
  </Row>
)

export default DashboardHeader;

/*
style={{ backgroundColor: '#03a9f3', zIndex: '100' }}
*/

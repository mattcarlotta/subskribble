import React from 'react';
import AppBar from 'material-ui/AppBar';

// import DashboardTabs from './Tabs';
import LeftNav from './leftNav';
import RightNav from './rightNav';
import Sidebar from './Sidebar';

const DashboardHeader = () => {
  return (
    <div className="dash-nav-container">
      <AppBar
        title={<LeftNav />}
        iconElementLeft={<Sidebar />}
        iconElementRight={<RightNav />}
        style={{ backgroundColor: '#03a9f3', zIndex: '100' }}
      />
      {/* <DashboardTabs /> */}
    </div>
  );
}

export default DashboardHeader;

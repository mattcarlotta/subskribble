import React from 'react';
import BasicPanel from '../../app/panels/basicPanel';
import TabPanel from '../../app/panels/tabPanel';
import CARDS from '../layouts/panelCards';
import OverviewLayout from '../layouts/overviewLayout';

const DashboardPanels = () => [
  <BasicPanel
    key="overviewpanel"
    containerClassName="active-panel"
    title="Overview"
    CARDBODY={OverviewLayout}
  />,
  <TabPanel
    key="customers-plans-panel"
    CARDS={CARDS}
    selectFieldClassName="panel-6"
  />
]

export default DashboardPanels;

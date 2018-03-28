import React from 'react';
import BasicPanel from '../../app/panels/basicPanel';
import TabPanel from '../../app/panels/tabPanel';
import { DashboardTabPanels, DashboardOverview } from '../layouts/panelCards';

export default () => [
  <BasicPanel key="overviewpanel" title="Overview" CARDS={DashboardOverview} />,
  <TabPanel key="customers-plans-panel" CARDS={DashboardTabPanels} selectFieldClassName="panel-6" />
];

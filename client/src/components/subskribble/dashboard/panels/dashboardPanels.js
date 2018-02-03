import React from 'react';
import BasicPanel from '../../app/panels/basicPanel';
import TabPanel from '../../app/panels/tabPanel';
import TogglePanelVisibility from '../../app/panels/TogglePanelVisibility';
import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';
import OverviewLayout from '../layouts/overviewLayout';
import LineChart from '../../app/charts/lineChart';
const CARDS = [
  {
    CUSTOMBUTTONS: CUSTOMERBUTTONS,
    GRAPH: <LineChart data={customerData} options={customerOptions}/>,
    SELECTFIELDITEMS: ['Current Month', 'Monthly', 'Yearly'],
    TAB: "Subscribers"
  },
  {
    CUSTOMBUTTONS: PLANBUTTONS,
    GRAPH: <LineChart data={planData} options={planOptions}/>,
    SELECTFIELDITEMS: ['Carlotta Prime'],
    TAB: "Plans"
  }
]
const NewBasicPanel = TogglePanelVisibility(BasicPanel);
const NewTabPanel = TogglePanelVisibility(TabPanel);

const DashboardPanels = () => [
  <NewBasicPanel
    key="overviewpanel"
    containerClassName="active-panel"
    title="Overview"
    CARDBODY={OverviewLayout}
  />,
  <NewTabPanel
    key="customers-plans-panel"
    CARDS={CARDS}
    selectFieldClassName="panel-6"
  />
]

export default DashboardPanels;

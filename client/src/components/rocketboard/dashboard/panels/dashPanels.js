import React from 'react';

import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';
import OverviewLayout from '../layouts/overviewLayout';
// import GraphChart from '../../app/charts/graphChart';
import LineChart from '../../app/charts/lineChart';
import Panel from '../../app/panels/customPanel';
import SliderPanel from '../../app/panels/SliderPanel';

const CARDS = [
  {
    CUSTOMBUTTONS: CUSTOMERBUTTONS,
    GRAPH: <LineChart data={customerData} options={customerOptions}/>,
    SELECTFIELDITEMS: ['Current Month', 'Monthly', 'Yearly'],
  },
  {
    CUSTOMBUTTONS: PLANBUTTONS,
    GRAPH: <LineChart data={planData} options={planOptions}/>,
    SELECTFIELDITEMS: ['Carlotta Prime'],
  }
]

const DashboardPanels = () => [
  <Panel
    key="overviewpanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Overview"
    CARDBODY={OverviewLayout}
  />,
  <SliderPanel
    key="customers-plans-panel"
    CARDS={CARDS}
    containerClassName="dash-customers-panel"
    selectFieldClassName="panel-6"
    TABS={["Customers", "Plans"]}
  />
]

export default DashboardPanels;

import React, { Component } from 'react';

import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';
import OverviewLayout from '../layouts/overviewLayout';
// import GraphChart from '../../app/charts/graphChart';
import Panel from '../../app/panels/customPanel';
import SliderPanel from '../../app/panels/SliderPanel';

const DashboardPanels = () => [
  <Panel
    key="overviewpanel"
    containerClassName="active-panel"
    initiallyExpanded={true}
    title="Overview"
    CARDBODY={OverviewLayout}
  />,
  <SliderPanel
    key="customerspanel"
    // containerClassName="dash-customers-panel"
    // initiallyExpanded={true}
    // title="Customers"
    // selectFieldClassName="panel-6"
    // SELECTFIELDITEMS={['Current Month', 'Monthly', 'Yearly']}
    // CUSTOMBUTTONS={CUSTOMERBUTTONS}
    // GRAPH={() => GraphChart(customerData, customerOptions)}
  />,
  // <SliderPanel
  //   allowExpander={false}
  //   key="planspanel"
  //   containerClassName="dash-plans-panel"
  //   initiallyExpanded={true}
  //   title="Plans"
  //   selectFieldClassName="panel-6"
  //   SELECTFIELDITEMS={['Carlotta Prime']}
  //   CUSTOMBUTTONS={PLANBUTTONS}
  //   // GRAPH={() => GraphChart(planData, planOptions)}
  // />
]

export default DashboardPanels;
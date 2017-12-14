import React from 'react';

import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';

import OverviewLayout from '../layouts/overviewLayout';
import GraphChart from '../../app/charts/graphChart';
import Panel from '../../app/panels/customPanel';

const DashboardPanels = () => {
  return (
    <span>
      <Panel
        containerClassName="active-panel"
        initiallyExpanded={true}
        title="Overview"
        CARDBODY={OverviewLayout}
      />
      <Panel
        containerClassName="dash-customers-panel"
        initiallyExpanded={true}
        title="Customers"
        selectFieldClassName="panel-6"
        selectFieldLabel="Sort By"
        SELECTFIELDITEMS={['Current Month', 'Monthly', 'Yearly']}
        CUSTOMBUTTONS={CUSTOMERBUTTONS}
        GRAPH={() => GraphChart(customerData, customerOptions)}
      />
      <Panel
        containerClassName="dash-plans-panel"
        initiallyExpanded={true}
        title="Refunds"
        selectFieldClassName="panel-6"
        selectFieldLabel="Sort By"
        SELECTFIELDITEMS={['Carlotta Prime']}
        CUSTOMBUTTONS={PLANBUTTONS}
        GRAPH={() => GraphChart(planData, planOptions)}
      />
    </span>
  )
}

export default DashboardPanels;

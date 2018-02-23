import React from 'react';
import LineChart from '../../app/charts/lineChart';
import OverviewLayout from '../layouts/overviewLayout';
import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';

export const DashboardOverview = [{ CARDBODY: OverviewLayout } ];

export const DashboardTabPanels = [
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

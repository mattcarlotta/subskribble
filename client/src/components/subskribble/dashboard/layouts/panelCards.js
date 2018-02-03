import React from 'react';
import LineChart from '../../app/charts/lineChart';
import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';

export default [
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

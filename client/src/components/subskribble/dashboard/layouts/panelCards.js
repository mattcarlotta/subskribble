import React from 'react';
import LineChart from '../../app/charts/lineChart';
import OverviewLayout from '../layouts/overviewLayout';
import CustomerSignupForm from '../../../../containers/subskribble/forms/CustomerSignupForm';
import { CUSTOMERBUTTONS, PLANBUTTONS } from '../fields/dashboardFieldsData';
import { customerData, customerOptions } from '../fields/customerChartFields';
import { planData, planOptions } from '../fields/planChartFields';

export const DashboardOverview = [{ CARDBODY: OverviewLayout } ];

export const DashboardTabPanels = [
  {
    BUTTONFORM: CustomerSignupForm,
    BUTTONFORMTITLE: 'Customer Signup',
    CUSTOMBUTTONS: CUSTOMERBUTTONS,
    GRAPH: LineChart(customerData, customerOptions),
    SELECTFIELDITEMS: ['Current Month', 'Monthly', 'Yearly'],
    SUBMITFORMTITLE: 'Subscribe',
    TAB: "Subscribers"
  },
  {
    CUSTOMBUTTONS: PLANBUTTONS,
    GRAPH: LineChart(data, planOptions),
    SELECTFIELDITEMS: ['Carlotta Prime'],
    TAB: "Plans"
  }
]

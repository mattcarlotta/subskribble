import React from 'react';
import { connect } from 'react-redux';
import { getDashboardData } from 'actions/dashboardActions.js';
import DashboardPanels from 'components/dashboard/DashboardPanels/DashboardPanels.js';

export default connect(
  state => ({ dashboardData: state.dashboard.data }),
  { getDashboardData },
)(props => <DashboardPanels {...props} />);

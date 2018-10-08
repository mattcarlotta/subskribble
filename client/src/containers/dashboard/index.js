import React from 'react';
import { connect } from 'react-redux';
import { getDashboardData } from '../../actions/dashboardActions';
import DashboardPanels from '../../components/dashboard/panels/DashboardPanels';

export default connect(
  state => ({ dashboardData: state.dashboard.data }),
  { getDashboardData },
)(props => <DashboardPanels {...props} />);

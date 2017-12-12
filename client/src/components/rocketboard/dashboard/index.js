import React from 'react';

import CustomersPanel from './customers';
import OverviewPanel from './overview';
import PlansPanel from './plans';

const Dashboard = () => {
	return (
		<div className="dashboard-container">
			<OverviewPanel />
			<CustomersPanel />
			<PlansPanel />
		</div>
	);
};

export default Dashboard;

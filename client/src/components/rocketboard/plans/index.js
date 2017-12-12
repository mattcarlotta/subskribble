import React from 'react';

import ActivePlansPanel from './panels/activePlansPanel';
import InactivePlansPanel from './panels/inactivePlansPanel';

const Plans = () => {
	return (
		<div className="plan-container">
			<ActivePlansPanel />
			<InactivePlansPanel />
		</div>
	);
};

export default Plans;

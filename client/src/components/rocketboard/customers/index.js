import React from 'react';

import ActiveCustomersPanel from './panels/activeCustomersPanel';
import InactiveCustomersPanel from './panels/inactiveCustomersPanel';

const Customers = () => {
	return (
		<div className="customer-container">
			<ActiveCustomersPanel />
			<InactiveCustomersPanel />
		</div>
	);
};

export default Customers;

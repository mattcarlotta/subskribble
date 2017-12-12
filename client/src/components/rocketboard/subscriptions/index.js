import React from 'react';

import ActiveSubscriptionsPanel from './panels/activeSubscriptionsPanel';
import InactiveSubscriptionsPanel from './panels/inactiveSubscriptionsPanel';

const Subscriptions = () => {
	return (
		<div className="subscriptions-container">
			<ActiveSubscriptionsPanel />
			<InactiveSubscriptionsPanel />
		</div>
	);
};

export default Subscriptions;

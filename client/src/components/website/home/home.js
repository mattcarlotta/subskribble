import React from 'react';

import InformationHeader from './header/informationHeader';
import InformationServices from './services/informationServices';
import InformationFeatures from './features/informationFeatures';
import InformationAutomation from './automation/informationAutomation';
import InformationPricing from './pricing/informationPricing';
import InformationSiteMap from './sitemap/informationSiteMap';

export default function() {
	return (
		<span>
			<InformationHeader />
			<InformationServices />
			<InformationFeatures />
			<InformationAutomation />
			<InformationPricing />
			<InformationSiteMap />
		</span>
	);
};

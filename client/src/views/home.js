import React from 'react';

import InformationLanding from '../components/home/informationLanding';
import InformationServices from '../components/home/services/informationServices';
import InformationFeatures from '../components/home/features/informationFeatures';

export default function() {
	return (
		<span>
			<InformationLanding />
			<InformationServices />
			<InformationFeatures />
		</span>
	);
};

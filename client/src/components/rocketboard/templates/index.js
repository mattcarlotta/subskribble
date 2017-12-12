import React from 'react';

import TemplatesPanel from './panels/templatesPanel';
import NewTemplatesPanel from './panels/newTemplatesPanel';

const Templates = () => {
	return (
		<div className="dashboard-container">
			<NewTemplatesPanel />
			<TemplatesPanel />
		</div>
	);
};

export default Templates;

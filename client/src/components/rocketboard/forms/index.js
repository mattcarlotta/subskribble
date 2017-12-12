import React from 'react';

import FormsPanel from './panels/formsPanel';
import NewFormPanel from './panels/newFormPanel';


const Forms = () => {
	return (
		<div className="forms-container">
			<NewFormPanel />
			<FormsPanel />
		</div>
	);
};

export default Forms;

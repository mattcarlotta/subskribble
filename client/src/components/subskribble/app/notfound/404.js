import React from 'react';
import { browserHistory } from 'react-router';

export default () => {
	const handleGoBack = () => browserHistory.goBack()

	return (
		<div className="notfound-container">
			<h1>404 - Not Found!</h1>
			<button onClick={handleGoBack}>
				Go Back
			</button>
		</div>
	);
};

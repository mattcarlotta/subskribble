import React from 'react';
import { Link } from 'react-router';
// import notFound from '../../images/notFound.png';

const NotFound = () => {
	return (
		<div className="notfound-container">
			<Link to="/">
				Go Back
			</Link>
		</div>
	);
};

export default NotFound;

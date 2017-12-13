import React from 'react';

import Footer from './footer'
import HandleNavBar from './HandleNavBar';

export default WrappedComponent => {
	const Wrapper = (props) => {
		return (
			<div className="wrapper-bg">
				<div className="wrapper-filter">
					<HandleNavBar />
					<WrappedComponent {...props} />
					<Footer />
				</div>				
			</div>
		);
	}

	return Wrapper;
};

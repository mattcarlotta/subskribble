import React from 'react';

import Footer from './footer'
import Header from './Header';

export default WrappedComponent => {
	const Wrapper = (props) => {
		return (
			<div className="wrapper-bg">
				<div className="wrapper-filter">
					<Header />
					<WrappedComponent {...props} />
					<Footer />
				</div>
			</div>
		);
	}

	return Wrapper;
};

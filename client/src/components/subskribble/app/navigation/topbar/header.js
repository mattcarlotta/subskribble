import React from 'react';
import LeftNav from './leftNav';
import RightNav from './rightNav';

export default props => (
	<div className="dash-nav-container">
		<LeftNav {...props} />
		<RightNav />
	</div>
)

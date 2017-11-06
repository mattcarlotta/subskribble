import React from 'react';

import RenderNotifications from '../containers/app/renderNotifications';
// import Footer from './navigation/footer';

const App = ({ children }) => {
	return (
		<div className="wrapper">
			{children}
			<RenderNotifications />
		</div>
	);
};

export default App;

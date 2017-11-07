import React from 'react';

import RenderNotifications from '../containers/app/renderNotifications';
// import Footer from './navigation/footer';

const App = ({ children }) => {
	return (
		<div>
			{children}
			<RenderNotifications />
		</div>
	);
};

export default App;

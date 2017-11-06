// APPLICATION ROUTES
import routes from './routes';

// REACT AND REACT-ROUTER IMPORTS
import React from 'react';
import { Router } from 'react-router';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// REDUX IMPORTS
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../store/configureStore';

// CONFIGURE REDUX STORE AND BROWSERHISTORY
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


// APP CONFIGURED WITH REDUX STORE, BROWSERHISTORY AND ROUTES
const App = () => {
	return (
		<MuiThemeProvider>
			<Provider store={store}>
				<Router history={history} routes={routes} />
			</Provider>
		</MuiThemeProvider>
	);
};

export default App;

// APP CONFIG IMPORTS (REACT, REDUX, MATERIAL-UI)
import React from 'react';
import { browserHistory, Router } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import routes from '../routes';

injectTapEventPlugin();

// CONFIG REDUX STORE WITH REDUCERS, MIDDLEWARES, AND BROWSERHISTORY
const store = createStore(rootReducer, applyMiddleware(thunk));
const history = syncHistoryWithStore(browserHistory, store);

// APP CONFIG'D WITH REDUX STORE, BROWSERHISTORY AND APP VIEWS
export default () => (
	<LocaleProvider locale={enUS}>
		<Provider store={store}>
			<Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} />
		</Provider>
	</LocaleProvider>
)
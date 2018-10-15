import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import routes from '../routes';

// injectTapEventPlugin();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </LocaleProvider>
);

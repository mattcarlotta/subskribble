import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/reducers.js';
import routes from 'routes/routes.js';

export const middlewares = applyMiddleware(thunk);

export const store = createStore(rootReducer, composeWithDevTools(middlewares));
const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </LocaleProvider>
);

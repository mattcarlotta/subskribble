import React from 'react';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route } from 'react-router';
import enUS from 'antd/lib/locale-provider/en_US';
import { mountComponent } from '../tests/utils';
import { store } from './root.js';
import RequireAuth from '../containers/app/auth/RequireAuth/RequireAuth';

describe('App', () => {
  const wrapper = mountComponent(
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={RequireAuth} />
        </Router>
      </Provider>
    </LocaleProvider>,
  );

  it('renders without errors', () => {
    const App = wrapper.find('.app');
    expect(App).toHaveLength(1);
  });
});

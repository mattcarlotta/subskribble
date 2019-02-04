import React from 'react';
import { shallowComponent } from '../../../../tests/utils';
import AppLoading from './AppLoading.js';
import Spinner from '../Spinner/Spinner.js';
import Login from '../../auth/Login/Login.js';

const initialState = {
  requestTimeout: false,
};

const initialProps = {
  loggedinUser: '',
  serverError: '',
};

describe('App Loader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowComponent(<AppLoading {...initialProps} />, initialState); // mount component
  });

  it('renders a spinner when the app initially loads', () => {
    const spinnerComponent = wrapper.find(Spinner).dive('div.spinnerContainer');
    expect(spinnerComponent).toHaveLength(1);
  });

  it('renders a login screen after a 1 second timeout and user login session is absent', () => {
    wrapper.setState({ requestTimeout: true });
    wrapper.update();
    const loginComponent = wrapper.find(Login).dive('div.settingsTab');
    expect(loginComponent).toHaveLength(1);
  });
});

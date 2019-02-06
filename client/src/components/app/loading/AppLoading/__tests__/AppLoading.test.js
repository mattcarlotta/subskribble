import AppLoading from '../AppLoading.js';
import Spinner from '../../Spinner/Spinner.js';
import Login from '../../../auth/Login/Login.js';

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
    wrapper = shallow(<AppLoading {...initialProps} />, initialState); // mount component
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
  });

  it('renders a spinner when the app initially loads', () => {
    const spinnerComponent = wrapper.find(Spinner).dive('div.spinnerContainer');
    expect(spinnerComponent).toHaveLength(1);
  });

  it('renders a login screen after a 1 second timeout and user login session is absent', () => {
    setTimeout(() => {
      wrapper.instance().notAuthed();
      const loginComponent = wrapper.find(Login).dive('div.settingsTab');
      expect(loginComponent).toHaveLength(1);
    }, 1000);
  });
});

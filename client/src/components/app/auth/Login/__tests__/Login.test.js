import Login, { forms, titles } from '../Login.js';

const initialState = {
  visible: true,
  selectedForm: forms[0],
  title: titles[0],
};

const initialProps = {
  store,
};

describe('Login', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Login} />
        </Router>
      </Provider>,
      initialState,
    );
  });

  it('renders without errors', () => {
    const modal = wrapper.find('div.ant-modal-content');
    const authBoxContainer = wrapper.find('div.authBoxContainer');
    expect(modal).toHaveLength(1);
    expect(authBoxContainer).toHaveLength(1);
  });

  it('initally displays a Login form', () => {
    const title = wrapper.find('div.ant-modal-title').text();
    const loginForm = wrapper.find('form.LoginForm');
    expect(title).toBe('Log In');
    expect(loginForm).toHaveLength(1);
  });

  it('displays a ResetPassword form if "Forgot your password" link was clicked', () => {
    wrapper
      .find('div.forgotPassword')
      .find('Link')
      .simulate('click');

    const resetPasswordForm = wrapper.find('form.ResetPasswordForm');
    expect(resetPasswordForm).toHaveLength(1);
  });

  it('displays a SignUp form if "Don\'t have an account? Sign Up" link was clicked', () => {
    wrapper
      .find('p.authLink')
      .find('Link')
      .simulate('click');

    const signUpForm = wrapper.find('form.SignupForm');
    expect(signUpForm).toHaveLength(1);
  });
});

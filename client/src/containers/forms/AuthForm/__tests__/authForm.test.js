import { AuthForm } from '../authForm.js';
import FIELDS from '../../LoginForm/loginFormFields.js';

const handleSubmit = jest.fn();
const switchAuthForm = jest.fn();

const initialProps = {
  confirmLoading: false,
  form: 'login-form',
  handleSubmit,
  iconType: 'login',
  FIELDS,
  pristine: true,
  submitLabel: 'Login',
  showForgotPassword: true,
  submitting: false,
  switchAuthForm,
};

describe('Auth Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AuthForm {...initialProps} />);
  });

  it('renders without errors', () => {
    expect(wrapper.find('form.login-form')).toHaveLength(1);
  });

  it('initially displays a show forgot password link and an account sign up link', () => {
    expect(wrapper.find('div.forgotPassword')).toHaveLength(1);
    expect(wrapper.find('span.no-account')).toHaveLength(1);
  });

  it('displays a login link if user already has an account', () => {
    wrapper.setProps({ showForgotPassword: false });
    expect(wrapper.find('span.login')).toHaveLength(1);
  });

  it('changes the form if one of the links is clicked', () => {
    wrapper
      .find('Link')
      .at(0)
      .simulate('click');
    expect(switchAuthForm).toHaveBeenCalled();
  });

  it('submits the form', () => {
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});

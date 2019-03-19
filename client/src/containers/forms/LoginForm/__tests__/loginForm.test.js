import { LoginForm } from '../loginForm.js';

const showLoadingButton = jest.fn();
const signinUser = jest.fn();

const initialProps = {
  showLoadingButton,
  signinUser,
};

const formProps = {
  username: 'test@test.com',
  password: 'password',
};

const wrapper = shallow(<LoginForm {...initialProps} />);
describe('Log In Form', () => {
  it('renders without errors', () => {
    expect(wrapper.find('ReduxForm')).toHaveLength(1);
  });

  it('attempts to log the user in', () => {
    wrapper.instance().handleFormSubmit(formProps);
    expect(showLoadingButton).toHaveBeenCalled();
    expect(signinUser).toHaveBeenCalledWith(formProps);
  });
});

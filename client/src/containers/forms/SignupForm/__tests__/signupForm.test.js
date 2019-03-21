import { SignupForm } from '../signupForm.js';

const showLoadingButton = jest.fn();
const signupUser = jest.fn();

const initialProps = {
  showLoadingButton,
  signupUser,
};

const formProps = {
  company: 'Test Company',
  email: 'test@test.com',
  firstName: 'Beta',
  lastName: 'Tester',
  password: 'password',
};

const wrapper = shallow(<SignupForm {...initialProps} />);
describe('Sign Up Form', () => {
  it('renders without errors', () => {
    expect(wrapper.find('ReduxForm')).toHaveLength(1);
  });

  it('attempts to sign up a new user', () => {
    wrapper.instance().handleFormSubmit(formProps);
    expect(showLoadingButton).toHaveBeenCalled();
    expect(signupUser).toHaveBeenCalledWith(formProps);
  });
});

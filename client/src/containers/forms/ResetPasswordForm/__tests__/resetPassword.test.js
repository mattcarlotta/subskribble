import { ResetPasswordForm } from '../resetpasswordForm.js';

const showLoadingButton = jest.fn();
const resetUserToken = jest.fn();

const initialProps = {
  resetUserToken,
  showLoadingButton,
};

const formProps = {
  email: 'test@test.com',
};

const wrapper = shallow(<ResetPasswordForm {...initialProps} />);
describe('Reset Password Form', () => {
  it('renders without errors', () => {
    expect(wrapper.find('ReduxForm')).toHaveLength(1);
  });

  it('attempts to send the user a reset password token', () => {
    wrapper.instance().handleFormSubmit(formProps);
    expect(showLoadingButton).toHaveBeenCalled();
    expect(resetUserToken).toHaveBeenCalledWith(formProps.email);
  });
});

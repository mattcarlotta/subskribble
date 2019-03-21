import { NewPasswordForm } from '../newPasswordForm.js';

const handleSubmit = jest.fn();
const missingPasswordToken = jest.fn();
const resetUserPassword = jest.fn();
const showLoadingButton = jest.fn();

const initialProps = {
  handleSubmit,
  missingPasswordToken,
  resetUserPassword,
  confirmLoading: false,
  pristine: true,
  submitting: false,
  showLoadingButton,
  location: {
    pathname: '/',
    query: {
      token: '',
    },
  },
};

const formProps = { password: 'password' };

describe('New Password Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NewPasswordForm {...initialProps} />);
  });

  it('renders without errors', () => {
    expect(wrapper.find('div.authBoxContainer')).toHaveLength(1);
  });

  it('calls missingPasswordToken if token is missing', () => {
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    expect(missingPasswordToken).toHaveBeenCalled();
  });

  it('resets user password if token is valid', () => {
    const token = 'validtoken';
    wrapper.setProps({
      location: {
        pathname: '/',
        query: {
          token,
        },
      },
    });
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    expect(showLoadingButton).toHaveBeenCalled();
    expect(resetUserPassword).toHaveBeenCalledWith(formProps.password, token);
  });
});

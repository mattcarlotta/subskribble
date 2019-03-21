import { DeleteAccountForm } from '../DeleteAccountForm';

const initialize = jest.fn();
const deleteUserAccount = jest.fn();
const handleSubmit = jest.fn();

const formProps = {
  company: 'Test Company',
  user: 'test@test.com',
  currentPassword: 'password',
  reason: 'Testing',
};

const initialProps = {
  company: 'Test Company',
  loggedinUser: 'test@test.com',
  initialize,
  deleteUserAccount,
  handleSubmit,
  pristine: true,
  submitting: false,
};

const wrapper = shallow(<DeleteAccountForm {...initialProps} />);
describe('Delete Account Form', () => {
  it('renders without errors', () => {
    expect(wrapper.find('form.delete-account')).toHaveLength(1);
  });

  it('initializes the form on CDM', () => {
    wrapper.instance().componentDidMount();
    expect(initialize).toHaveBeenCalled();
  });

  it('updates the account on submit', () => {
    wrapper.instance().handleFormSubmit(formProps);
    expect(deleteUserAccount).toHaveBeenCalledWith(formProps);
  });
});

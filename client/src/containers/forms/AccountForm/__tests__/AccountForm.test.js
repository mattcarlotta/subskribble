import { AccountForm } from '../AccountForm.js';

const initialize = jest.fn();
const updateUserAccount = jest.fn();

const initialProps = {
  company: 'Test Org',
  firstName: 'Beta',
  lastName: 'Tester',
  loggedinUser: 'test@test.com',
  updateUserAccount,
  handleSubmit: () => {},
  serverError: '',
  serverMessage: '',
  initialize,
  pristine: true,
  submitting: false,
};

const formProps = {
  company: 'Test Org',
  firstName: 'Beta',
  lastName: 'Tester',
  email: 'test@test.com',
  currentPassword: 'password',
  updatedPassword: '0m4j0fPYKBe8gomF1kzM',
};

const initialState = {
  confirmLoading: false,
};

describe('Account Form', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AccountForm {...initialProps} />, initialState);
  });

  it('renders without errors', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('updates the users account', () => {
    wrapper.instance().handleFormSubmit(formProps);
    wrapper.update();
    expect(wrapper.state('confirmLoading')).toBeTruthy();
    expect(updateUserAccount).toHaveBeenCalledWith(formProps);
  });
});

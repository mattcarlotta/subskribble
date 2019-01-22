import { setup, checkProps, findByTestAttr } from '../../../../tests/utils';
import EmailConfirmation from './emailConfirmation.js';

describe('Email Confirmation', () => {
  let wrapper;
  let initialProps = {
    status: '',
    userVerified: '',
  };

  beforeEach(() => {
    wrapper = setup(EmailConfirmation, initialProps, null); // set wrapper with initialState
  });

  it('renders without errors', () => {
    const emailConfirmationComponent = findByTestAttr(
      wrapper,
      'component-emailConfirmation',
    ); // get email confirmation component
    expect(emailConfirmationComponent).toHaveLength(1);
  });

  it('does not not throw PropType warnings', () =>
    checkProps(EmailConfirmation, initialProps));

  it('renders a failed verification message if email was invalid', () => {
    const verificationFailureComponent = findByTestAttr(
      wrapper,
      'component-verificationFailure',
    ); // get failed verification message component
    expect(verificationFailureComponent).toHaveLength(1);
  });

  it("renders a success verification message and displays the user's email", () => {
    initialProps = {
      status: 'verified',
      userVerified: 'email@test.com',
    };
    wrapper = setup(EmailConfirmation, initialProps, null); // set wrapper with initialState
    const verificationFailureComponent = findByTestAttr(
      wrapper,
      'component-verificationSuccess',
    ); // get success verification message component
    const userVerified = findByTestAttr(wrapper, 'userVerified').text(); // get userVerified email
    expect(verificationFailureComponent).toHaveLength(1);
    expect(userVerified).toContain(initialProps.userVerified);
  });
});

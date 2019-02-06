import EmailConfirmation from '../emailConfirmation.js';

describe('Email Confirmation', () => {
  let wrapper;
  let initialProps = {
    status: '',
    userVerified: '',
  };

  beforeEach(() => {
    wrapper = shallow(<EmailConfirmation {...initialProps} />); // set wrapper with initialState
  });

  it('renders without errors', () => {
    const emailConfirmationComponent = wrapper.find(
      'div.verificationContainer',
    );
    expect(emailConfirmationComponent).toHaveLength(1);
  });

  it('does not not throw PropType warnings', () =>
    checkProps(EmailConfirmation, initialProps));

  it('renders a failed verification message if email was invalid', () => {
    const verificationFailureComponent = wrapper.find(
      'div.verificationFailure',
    ); // get failed verification message component
    expect(verificationFailureComponent).toHaveLength(1);
  });

  it('renders a success verification message and displays the authenticated email', () => {
    initialProps = {
      status: 'verified',
      userVerified: 'email@test.com',
    };
    wrapper.setProps({ ...initialProps });

    const verificationFailureComponent = wrapper.find(
      'div.verificationSuccess',
    ); // get success verification message component
    const userVerified = wrapper.find('p.message').text(); // get userVerified email
    expect(verificationFailureComponent).toHaveLength(1);
    expect(userVerified).toContain(initialProps.userVerified);
  });
});

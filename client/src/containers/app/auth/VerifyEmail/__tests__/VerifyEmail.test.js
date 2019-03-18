import { VerifyEmail } from '../VerifyEmail.js';

const missingVerificationToken = jest.fn();
const verifyEmail = jest.fn();
const token = '1234a1234v1234e1234sfdf3f99md0sdlj';

const initialProps = {
  location: {
    query: {
      token: '',
    },
  },
  missingVerificationToken,
  verifyEmail,
  userVerified: undefined,
};

describe('Require Auth', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<VerifyEmail {...initialProps} />);
  });

  it('initially displays a Spinner component', () => {
    wrapper.instance().componentDidMount();
    expect(missingVerificationToken).toHaveBeenCalled();
    expect(wrapper.find('div.spinnerContainer')).toHaveLength(1);
  });

  it('displays App component if a user has been verified', () => {
    wrapper.setProps({
      userVerified: 'verified',
      location: { query: { token } },
    });
    wrapper.instance().componentDidMount();
    expect(verifyEmail).toHaveBeenCalledWith(token);
    expect(wrapper.find('EmailConfirmation')).toHaveLength(1);
  });
});

import { DeleteAccount } from '../DeleteAccount.js';

const initialProps = {
  company: 'Testing Org',
  firstName: 'Beta',
  lastName: 'Tester',
  loggedinUser: 'test@test.com',
};

describe('Delete Account Page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DeleteAccount {...initialProps} />);
  });

  it('renders without errors', () => {
    expect(wrapper.find('PageContainer')).toHaveLength(1);
  });

  it('displays a DeleteAccountForm component', () => {
    expect(wrapper.find('ReduxForm')).toHaveLength(1);
  });
});

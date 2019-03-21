import { RequireAuth } from '../RequireAuth.js';

const authenticateUser = jest.fn();
const saveSidebarState = jest.fn();

const initialProps = {
  authenticateUser,
  collapseSideNav: false,
  loggedinUser: '',
  serverMessage: '',
  saveSidebarState,
  location: {
    pathname: '/',
  },
};

describe('Require Auth', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RequireAuth {...initialProps} />);
  });

  it('renders without errors', () => {
    expect(wrapper.find('div.app')).toHaveLength(1);
  });

  it('initially displays AppLoading component', () => {
    expect(wrapper.find('AppLoading')).toHaveLength(1);
  });

  it('displays App component if a user logs in', () => {
    wrapper.setProps({ loggedinUser: 'test@test.com' });
    expect(wrapper.find('withRouter(App)')).toHaveLength(1);
  });
});

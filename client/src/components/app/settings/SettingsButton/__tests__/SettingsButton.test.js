import SettingsButton from '../SettingsButton.js';

const initialState = { visibleSettings: false };

const logoutUser = jest.fn();

const initialProps = {
  avatarURL: 'http://localhost:4000/uploads/example.png',
  firstName: 'Beta',
  lastName: 'Tester',
  logoutUser,
};

describe('Navbar Settings Button', () => {
  let wrapper;
  let settingButton;
  beforeEach(() => {
    wrapper = mount(
      <Router history={browserHistory}>
        <Route
          path="/"
          component={() => <SettingsButton {...initialProps} />}
        />
      </Router>,
      initialState,
    );
    settingButton = wrapper.find('button.settingButton');
  });

  it('renders without errors', () => {
    const settings = wrapper.find('div.settingsTab');
    expect(settings).toHaveLength(1);
  });

  it('renders a button and the current logged in user', () => {
    const currentUser = wrapper.find('span.currentUser').text();
    expect(settingButton).toHaveLength(1);
    expect(currentUser).toContain('Beta Tester');
  });

  describe('when the settings button has been clicked', () => {
    let settingsPopover;
    beforeEach(() => {
      settingButton.simulate('click');
      settingsPopover = wrapper.find('ul.settingsTabContainer');
    });

    it('renders a popover', () => {
      expect(settingsPopover).toHaveLength(1);
    });

    it('contains Settings and Logout menu items', () => {
      const menuItems = wrapper.find('span.settingsLabel');
      const settingsItem = menuItems.at(0).text();
      const logoutItem = menuItems.at(1).text();
      expect(settingsItem).toBe('Settings');
      expect(logoutItem).toBe('Logout');
    });

    it('clicking on the Logout menu item logs out the user', () => {
      wrapper
        .find('Link.menuOptions')
        .at(1)
        .simulate('click');

      expect(logoutUser).toHaveBeenCalled();
    });
  });
});

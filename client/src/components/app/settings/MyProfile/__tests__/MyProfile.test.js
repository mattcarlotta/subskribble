import MyProfile from '../MyProfile.js';

const deleteAccountAvatar = jest.fn();
const deleteAvatar = jest.fn();
const fetchAvatarOnLogin = jest.fn();
const updateAvatar = jest.fn();
const updateUserAccount = jest.fn();
const uploadAvatar = jest.fn();
const serverErrorMessage = jest.fn();

const initialProps = {
  avatarURL: undefined,
  collapseSideNav: false,
  company: 'Subskribble',
  deleteAccountAvatar,
  deleteAvatar,
  fetchAvatarOnLogin,
  firstName: 'Beta',
  isGod: true,
  lastName: 'Tester',
  loggedinUser: 'betatester@subskribble.com',
  serverError: '',
  serverMessage: '',
  serverErrorMessage,
  updateAvatar,
  updateUserAccount,
  uploadAvatar,
};

const wrapper = mount(
  <Provider store={store}>
    <MyProfile {...initialProps} />
  </Provider>,
);

describe('My Profile', () => {
  it('renders without errors', () => {
    const myprofileComponent = wrapper.find('div.settingsContainer');
    expect(myprofileComponent).toHaveLength(1);
  });

  it('displays an CurrentAvatar component', () => {
    const currentAvatarComponent = wrapper.find('CurrentAvatar');
    expect(currentAvatarComponent).toHaveLength(1);
  });

  it('displays an AccountForm component', () => {
    const accountFormComponent = wrapper.find('AccountForm');
    expect(accountFormComponent).toHaveLength(1);
  });

  it('displays a DeleteAccount component', () => {
    const deleteAccountFormComponent = wrapper.find('div.deleteAccountDetails');
    expect(deleteAccountFormComponent).toHaveLength(1);
  });

  it('renders AvatarForm when clicking on the Change Avatar button', () => {
    wrapper.find('Button.change').simulate('click');
    const avatarForm = wrapper.find('div.avatarForm');
    expect(avatarForm).toHaveLength(1);
  });

  it('reverts back to CurrentAvatar when clicking on the Cancel button inside the AvatarForm', () => {
    wrapper.find('Button.cancel').simulate('click');
    const currentAvatarComponent = wrapper.find('CurrentAvatar');
    expect(currentAvatarComponent).toHaveLength(1);
  });
});

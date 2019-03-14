import * as actions from '../authActions';
import * as mocked from '../__mocks__/authActions.mocks.js';

describe('Auth Actions', () => {
  let store;
  beforeEach(() => {
    store = createStoreFactory();
  });

  afterEach(() => {
    mockApp.reset();
    mockAPI.reset();
  });

  afterAll(() => {
    mockApp.restore();
    mockAPI.restore();
  });

  describe('Log In', () => {
    beforeEach(() => {
      mockApp.onPost('signin').reply(200, mocked.data);
      mockAPI
        .onGet('avatar/current-user')
        .reply(200, { avatarurl: mocked.avatarurl });
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('logs user in if username and password are correct', async () => {
      await Promise.resolve(store.dispatch(actions.signinUser(mocked.creds)));
      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth).toEqual({
          avatarURL: mocked.avatarurl,
          company: mocked.data.company,
          loggedinUser: mocked.data.email,
          firstName: mocked.data.firstname,
          lastName: mocked.data.lastname,
          collapseSideNav: mocked.data.collapsesidenav,
          isGod: mocked.data.isgod,
        });
      }, 1000);
    });

    it('displays an error if username and password are incorrect', async () => {
      const err = 'That username and/or password is invalid!';
      mockApp.onPost('signin').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.signinUser(mocked.creds)));
      const {
        server: { error },
      } = store.getState();
      expect(error).toEqual(err);
    });
  });

  describe('Logged In Session', () => {
    it('logs user in if cookie is valid and present', async () => {
      mockApp
        .onGet('loggedin')
        .reply(200, { ...mocked.data, avatarurl: mocked.avatarurl });
      await store.dispatch(actions.authenticateUser());
      const { auth } = store.getState();
      expect(auth).toEqual({
        avatarURL: mocked.avatarurl,
        company: mocked.data.company,
        loggedinUser: mocked.data.email,
        firstName: mocked.data.firstname,
        lastName: mocked.data.lastname,
        collapseSideNav: mocked.data.collapsesidenav,
        isGod: mocked.data.isgod,
      });
    });

    it('if cookie is missing, sets loggedinUser to null', async () => {
      mockApp.onGet('loggedin').reply(200);
      await store.dispatch(actions.authenticateUser());
      const { auth } = store.getState();
      expect(auth).toEqual({ loggedinUser: null });
    });

    it('if API call fails, sets loggedinUser to null ', async () => {
      mockApp.onGet('loggedin').reply(404);
      await store.dispatch(actions.authenticateUser());
      const { auth } = store.getState();
      expect(auth).toEqual({ loggedinUser: null });
    });
  });

  describe('Sign Up', () => {
    let message;
    beforeEach(() => {
      message = 'Welcome to subskribble Test!';
      mockApp.onPost('signup').reply(201, { message });
    });

    it('displays a message if signs up is successful', async () => {
      await Promise.resolve(store.dispatch(actions.signupUser(mocked.signUp)));
      const { server } = store.getState();
      expect(server.message).toEqual(message);
    });

    it('displays an error if signs up is unsuccessful', async () => {
      const err = 'That company is already registered!';
      mockApp.onPost('signup').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.signupUser(mocked.signUp)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Update User Account', () => {
    beforeEach(() => {
      mockApp
        .onPut('update-account')
        .reply(201, { ...mocked.updatedUserAccount });
      mockApp.onGet('notifications').reply(200, {
        readnotifications: mocked.readNotifications,
        unreadnotifications: mocked.unreadNotifications,
      });
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('displays a message, fetches notifications, and updates logged in user details if the account was successful updated', async () => {
      await Promise.resolve(
        store.dispatch(actions.updateUserAccount(mocked.updatedData)),
      );
      setTimeout(() => {
        const { auth, notes, server } = store.getState();
        expect(server.message).toEqual('Successfully updated account!');
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
        expect(auth).toEqual({
          avatarURL: mocked.updatedData.avatarurl,
          company: mocked.updatedData.company,
          loggedinUser: mocked.updatedData.email,
          firstName: mocked.updatedData.firstname,
          lastName: mocked.updatedData.lastname,
          collapseSideNav: mocked.updatedData.collapsesidenav,
          isGod: mocked.updatedData.isgod,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'That password is invalid!';
      mockApp.onPut('update-account').reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.updateUserAccount(mocked.updatedData)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete User Account', () => {
    let message;
    let token;
    let userid;
    beforeEach(() => {
      message = 'Succesfully deleted account!';
      token = '123456abcdef';
      userid = '88';
      mockApp.onDelete('delete-account').reply(200, { message, token, userid });
      mockApp.onDelete('avatar/delete').reply(200);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('displays a message and logs user out', async () => {
      await Promise.resolve(
        store.dispatch(actions.deleteUserAccount(mocked.data)),
      );
      setTimeout(() => {
        const { server } = store.getState();
        expect(server.message).toEqual(message);
      }, 1000);
    });
  });

  describe('Reset Password', () => {
    let message;
    let token;
    let err;
    beforeEach(() => {
      message = 'Succesfully updated password!';
      token = '123456abcdef';
      err = 'Unable to reset password!';
      mockApp
        .onPut(`reset-password/verify?token=${token}`)
        .reply(200, { message });
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('sends a password token via email', async () => {
      await Promise.resolve(
        store.dispatch(actions.resetUserPassword('newpassword', token)),
      );
      setTimeout(() => {
        const { server } = store.getState();
        expect(server.message).toEqual(message);
      }, 1000);
    });

    it('displays an error message an if request fails', async () => {
      mockApp.onPut(`reset-password/verify?token=${token}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.resetUserPassword('newpassword', token)),
      );
      setTimeout(() => {
        const { server } = store.getState();
        expect(server.error).toEqual(err);
      }, 1000);
    });

    it('displays an error message if password token is missing', async () => {
      await Promise.resolve(store.dispatch(actions.missingPasswordToken()));
      const { server } = store.getState();
      expect(server.error).toEqual(
        'Missing password token! Please check your email and click on the "Create New Password" button.',
      );
    });
  });

  describe('Verify Email', () => {
    let token;
    let email;
    let err;
    beforeEach(() => {
      email = 'test@test.com';
      token = '123456abcdef';
      err = 'That token is invalid!';
      mockApp.onPut(`email/verify?token=${token}`).reply(200, { email });
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it("verifies user's email via a token", async () => {
      await Promise.resolve(store.dispatch(actions.verifyEmail(token)));
      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth.userVerified).toEqual(email);
      }, 1000);
    });

    it('displays an error message and sets user verified to false if token is invalid', async () => {
      mockApp.onPut(`email/verify?token=${token}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.verifyEmail(token)));
      setTimeout(() => {
        const { auth, server } = store.getState();
        expect(server.error).toEqual(err);
        expect(auth.userVerified).toBeFalsy();
      }, 1000);
    });

    it('sets user verified to false if token is missing', async () => {
      await Promise.resolve(store.dispatch(actions.missingVerificationToken()));
      const { auth } = store.getState();
      expect(auth.userVerified).toBeFalsy();
    });
  });

  describe('Sidebar Collapsed', () => {
    let collapseSideNav;
    let err;
    beforeEach(() => {
      collapseSideNav = true;
      err = 'Unable to save collapsed sidebar state!';
      mockApp
        .onPut(`save-sidebar-state?collapseSideNav=${collapseSideNav}`)
        .reply(200, { collapseSideNav });
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('when button has been clicked, collpases sidebar navigation', async () => {
      await Promise.resolve(
        store.dispatch(actions.saveSidebarState(collapseSideNav)),
      );
      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth.collapseSideNav).toEqual(collapseSideNav);
      }, 1000);
    });

    it('displays an error message if request fails', async () => {
      mockApp
        .onPut(`save-sidebar-state?collapseSideNav=${collapseSideNav}`)
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.saveSidebarState(collapseSideNav)),
      );
      setTimeout(() => {
        const { server } = store.getState();
        expect(server.error).toEqual(err);
      }, 1000);
    });
  });
});

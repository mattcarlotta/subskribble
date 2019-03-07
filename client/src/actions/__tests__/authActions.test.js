import * as actions from '../authActions';

const avatarurl = 'http://test.com/test.png';

const data = {
  company: 'Test',
  email: 'test@test.com',
  firstname: 'Test',
  lastname: 'Test',
  collapsesidenav: false,
  isgod: false,
};

const dataStored = {
  company: 'Test',
  loggedinUser: 'test@test.com',
  firstName: 'Test',
  lastName: 'Test',
  collapseSideNav: false,
  isGod: false,
};

const fakeCreds = {
  username: 'test@test.com',
  password: 'password',
};

const fakeSignUp = {
  company: 'Test',
  firstName: 'Test',
  lastName: 'Test',
  ...fakeCreds,
};

describe('Auth Actions', () => {
  let store;
  beforeEach(() => {
    store = createStoreFactory();
  });

  afterEach(() => {
    mockApp.reset();
  });

  afterAll(() => {
    mockApp.restore();
    mockAPI.restore();
  });

  describe('Log In', () => {
    beforeEach(() => {
      mockApp.onPost('signin').reply(200, data);
      mockAPI.onGet('avatar/current-user').reply(200, { avatarurl });
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('logs user in if username and password are correct', async () => {
      await Promise.resolve(store.dispatch(actions.signinUser(fakeCreds)));
      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth).toEqual({ ...dataStored, avatarURL: avatarurl });
      });
    });

    it('displays an error if username and password are incorrect', async () => {
      const err = 'That username and/or password is invalid!';
      mockApp.onPost('signin').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.signinUser(fakeCreds)));
      const {
        server: { error },
      } = store.getState();
      expect(error).toEqual(err);
    });
  });

  describe('Logged In Session', () => {
    it('logs user in if cookie is valid and present', async () => {
      mockApp.onGet('loggedin').reply(200, data);
      await store.dispatch(actions.authenticateUser());
      const { auth } = store.getState();
      expect(auth).toEqual(dataStored);
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
      await Promise.resolve(store.dispatch(actions.signupUser(fakeSignUp)));
      const { server } = store.getState();
      expect(server.message).toEqual(message);
    });

    it('displays an error if signs up is unsuccessful', async () => {
      const err = 'That company is already registered!';
      mockApp.onPost('signup').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.signupUser(fakeSignUp)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

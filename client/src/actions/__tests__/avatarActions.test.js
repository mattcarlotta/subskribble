import * as actions from '../avatarActions';
import * as types from '../../types';

const avatarurl = 'http://test.com/test.png';
const updAvatarURL = 'http://test.com/test2.png';
const err = 'Unable to complete that request!';

describe('Avatar Actions', () => {
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

  describe('On User Login', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches the avatarurl', async () => {
      mockAPI.onGet('avatar/current-user').reply(200, { avatarurl });
      await Promise.resolve(store.dispatch(actions.fetchAvatarOnLogin()));

      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth.avatarURL).toEqual(avatarurl);
      }, 1000);
    });

    it('displays an error if the request failed', async () => {
      mockAPI.onGet('avatar/current-user').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchAvatarOnLogin()));

      setTimeout(() => {
        const { server } = store.getState();
        expect(server.error).toEqual(err);
      }, 1000);
    });
  });

  describe('Upload Action', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('uploads an avatar', async () => {
      mockAPI.onPost('avatar/create').reply(200, { avatarurl });
      await Promise.resolve(store.dispatch(actions.uploadAvatar(avatarurl)));

      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth.avatarURL).toEqual(avatarurl);
      }, 1000);
    });

    it('displays an error if the request failed', async () => {
      mockAPI.onPost('avatar/create').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.uploadAvatar(avatarurl)));

      setTimeout(() => {
        const { server } = store.getState();
        expect(server.error).toEqual(err);
      }, 1000);
    });
  });

  describe('Update Action', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates an avatar', async () => {
      mockAPI.onPut('avatar/update').reply(200, { avatarurl: updAvatarURL });
      await Promise.resolve(store.dispatch(actions.updateAvatar(updAvatarURL)));

      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth.avatarURL).toEqual(updAvatarURL);
      }, 1000);
    });

    it('displays an error if the request failed', async () => {
      mockAPI.onPut('avatar/update').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.updateAvatar(updAvatarURL)));

      setTimeout(() => {
        const { server } = store.getState();
        expect(server.error).toEqual(err);
      }, 1000);
    });
  });

  describe('Delete Action', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes the current avatar', async () => {
      mockAPI.onDelete('avatar/delete').reply(200);
      await store.dispatch({
        type: types.SET_CURRENT_AVATAR,
        payload: avatarurl,
      });
      const { auth } = store.getState();
      expect(auth.avatarURL).toEqual(avatarurl);

      await Promise.resolve(store.dispatch(actions.deleteAvatar()));
      setTimeout(() => {
        const { auth } = store.getState();
        expect(auth.avatarUrl).toBeUndefined();
      }, 1000);
    });

    it('displays an error if the request failed', async () => {
      mockAPI.onDelete('avatar/delete').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteAvatar()));

      setTimeout(() => {
        const { server } = store.getState();
        expect(server.error).toEqual(err);
      }, 1000);
    });
  });
});

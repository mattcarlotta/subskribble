import * as actions from 'actions/notificationActions.js';
import * as mocked from 'actions/__mocks__/actions.mocks.js';

const unreadnotifications = [mocked.unreadNotifications];
const readnotifications = [mocked.readNotifications];
const allreadnotifications = [
  { ...mocked.unreadNotifications, read: true },
  mocked.readNotifications,
];

describe('Notification Actions', () => {
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

  describe('Delete Notification', () => {
    let id;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a notification', async () => {
      await store.dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: {
          unreadnotifications,
          readnotifications,
        },
      });
      mockApp.onDelete(`notification/delete?id=${id}`).reply(200);
      await Promise.resolve(store.dispatch(actions.deleteNotification(id)));

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: [],
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete(`notification/delete?id=${id}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteNotification(id)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Notifications', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches notifications', async () => {
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(store.dispatch(actions.fetchNotifications()));

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('notifications').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchNotifications()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Remove All Notifications', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('removes all notifications', async () => {
      await store.dispatch({
        type: 'SET_NOTIFICATIONS',
        payload: {
          unreadnotifications,
          readnotifications,
        },
      });
      mockApp.onDelete('notifications/deleteall').reply(200);
      await Promise.resolve(store.dispatch(actions.removeAllNotifications()));

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          unreadNotifications: [],
          readNotifications: [],
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete('notifications/deleteall').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.removeAllNotifications()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Update All Notifications', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates all notifications as read', async () => {
      mockApp.onGet('notifications').reply(200, {
        readnotifications: allreadnotifications,
        unreadnotifications: [],
      });
      mockApp.onPut('notification/markasread').reply(200);
      await Promise.resolve(store.dispatch(actions.updateNotifications()));

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: allreadnotifications,
          unreadNotifications: [],
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut('notification/markasread').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.updateNotifications()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

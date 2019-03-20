import * as actions from 'actions/subscriberActions.js';
import * as mocked from 'actions/__mocks__/actions.mocks.js';

const allactivesubs = [
  [{ ...mocked.inactivesubscribers[0], status: 'active' }],
  ...mocked.activesubscribers,
];

const unreadnotifications = [mocked.unreadNotifications];
const readnotifications = [mocked.readNotifications];

describe('Subscriber Actions', () => {
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

  describe('Fetch Subscribers', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches initial subscriber records', async () => {
      mockApp.onGet('subscribers').reply(200, {
        activesubscribers: mocked.activesubscribers,
        inactivesubscribers: mocked.inactivesubscribers,
      });
      await Promise.resolve(store.dispatch(actions.fetchItems()));

      setTimeout(() => {
        const { subs } = store.getState();
        expect(subs).toEqual({
          activeitems: mocked.activesubscribers,
          activeitemcount: 0,
          inactiveitems: mocked.inactivesubscribers,
          inactiveitemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('subscribers').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItems()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Subscriber Counts', () => {
    let activesubscriberscount;
    let inactivesubscriberscount;
    beforeEach(() => {
      activesubscriberscount = 5;
      inactivesubscriberscount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches active and inactive subs counts', async () => {
      mockApp.onGet('subscribercounts').reply(200, {
        activesubscriberscount,
        inactivesubscriberscount,
      });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));

      setTimeout(() => {
        const { subs } = store.getState();
        expect(subs).toEqual({
          activeitems: [],
          activeitemcount: activesubscriberscount,
          inactiveitems: [],
          inactiveitemcount: inactivesubscriberscount,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('subscribercounts').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete Subcriber', () => {
    let subscriberid;
    let planName;
    let activesubscriberscount;
    let inactivesubscriberscount;
    beforeEach(() => {
      subscriberid = '1234-1234-1234-1234';
      planName = 'Test Plan';
      activesubscriberscount = 5;
      inactivesubscriberscount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a sub and gets current subs and subs count', async () => {
      mockApp
        .onDelete(
          `subscribers/delete?subscriberid=${subscriberid}&planname=${planName}`,
        )
        .reply(200);
      mockApp.onGet('subscribers').reply(200, {
        activesubscribers: mocked.activesubscribers,
        inactivesubscribers: mocked.inactivesubscribers,
      });
      mockApp.onGet('subscribercounts').reply(200, {
        activesubscriberscount,
        inactivesubscriberscount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(
        store.dispatch(actions.deleteAction(subscriberid, planName)),
      );

      setTimeout(() => {
        const { subs, notes } = store.getState();
        expect(subs).toEqual({
          activeitems: mocked.activesubscribers,
          activeitemcount: activesubscriberscount,
          inactiveitems: mocked.inactivesubscribers,
          inactiveitemcount: inactivesubscriberscount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp
        .onDelete(
          `subscribers/delete?subscriberid=${subscriberid}&planname=${planName}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.deleteAction(subscriberid, planName)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Next/Prev Subscribers', () => {
    let table;
    let page;
    let sortByNum;
    beforeEach(() => {
      table = 'Active Subscribers';
      page = 1;
      sortByNum = 10;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches next or previous subs records', async () => {
      mockApp
        .onGet(
          `subscribers/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(200, {
          activesubscribers: mocked.activesubscribers,
        });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );

      setTimeout(() => {
        const { subs } = store.getState();
        expect(subs).toEqual({
          activeitems: mocked.activesubscribers,
          activeitemcount: 0,
          inactiveitems: [],
          inactiveitemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp
        .onGet(
          `subscribers/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Updates Subsriber Status', () => {
    let activesubscriberscount;
    let inactivesubscriberscount;
    let id;
    let updateType;
    let statusType;
    beforeEach(() => {
      activesubscriberscount = 2;
      inactivesubscriberscount = 0;
      id = '1235-1235-1235-1235';
      updateType = 'activate';
      statusType = 'activated';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a subscriber record status, gets current subs, gets promos subs, and fetches notifications', async () => {
      mockApp.onPut(`subscribers/update/${id}`).reply(200);
      mockApp.onGet('subscribers').reply(200, {
        activesubscribers: allactivesubs,
        inactivesubscribers: [],
      });
      mockApp.onGet('subscribercounts').reply(200, {
        activesubscriberscount,
        inactivesubscriberscount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );

      setTimeout(() => {
        const { subs, notes } = store.getState();
        expect(subs).toEqual({
          activeitems: allactivesubs,
          activeitemcount: activesubscriberscount,
          inactiveitems: [],
          inactiveitemcount: inactivesubscriberscount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`subscribers/update/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

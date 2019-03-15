import * as actions from '../promoActions.js';
import * as mocked from '../__mocks__/actions.mocks.js';

const allactivepromos = [
  [{ ...mocked.inactivepromos[0], status: 'active' }],
  ...mocked.activepromos,
];

const unreadnotifications = [mocked.unreadNotifications];
const readnotifications = [mocked.readNotifications];

describe('Promo Actions', () => {
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

  describe('Fetch Promos', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches initial promos records', async () => {
      mockApp.onGet('promotionals').reply(200, {
        activepromos: mocked.activepromos,
        inactivepromos: mocked.inactivepromos,
      });
      await Promise.resolve(store.dispatch(actions.fetchItems()));

      setTimeout(() => {
        const { promos } = store.getState();
        expect(promos).toEqual({
          activeitems: mocked.activepromos,
          activeitemcount: 0,
          inactiveitems: mocked.inactivepromos,
          inactiveitemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('promotionals').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItems()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Plans Counts', () => {
    let activepromocount;
    let inactivepromocount;
    beforeEach(() => {
      activepromocount = 5;
      inactivepromocount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches active and inactive promos counts', async () => {
      mockApp.onGet('promotionalcounts').reply(200, {
        activepromocount,
        inactivepromocount,
      });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));

      setTimeout(() => {
        const { promos } = store.getState();
        expect(promos).toEqual({
          activeitems: [],
          activeitemcount: activepromocount,
          inactiveitems: [],
          inactiveitemcount: inactivepromocount,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('promotionalcounts').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete Promo', () => {
    let id;
    let activepromocount;
    let inactivepromocount;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      activepromocount = 5;
      inactivepromocount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a promo and gets current promos and promos count', async () => {
      mockApp.onDelete(`promotionals/delete/${id}`).reply(200);
      mockApp.onGet('promotionals').reply(200, {
        activepromos: mocked.activepromos,
        inactivepromos: mocked.inactivepromos,
      });
      mockApp.onGet('promotionalcounts').reply(200, {
        activepromocount,
        inactivepromocount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));

      setTimeout(() => {
        const { promos, notes } = store.getState();
        expect(promos).toEqual({
          activeitems: mocked.activepromos,
          activeitemcount: activepromocount,
          inactiveitems: mocked.inactivepromos,
          inactiveitemcount: inactivepromocount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete(`promotionals/delete/${id}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Next/Prev Promos', () => {
    let table;
    let page;
    let sortByNum;
    beforeEach(() => {
      table = 'Active Promos';
      page = 1;
      sortByNum = 10;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches next or previous promo records', async () => {
      mockApp
        .onGet(
          `promotionals/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(200, {
          activepromos: mocked.activepromos,
        });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );

      setTimeout(() => {
        const { promos } = store.getState();
        expect(promos).toEqual({
          activeitems: mocked.activepromos,
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
          `promotionals/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Updates Promo Status', () => {
    let activepromocount;
    let inactivepromocount;
    let id;
    let updateType;
    let statusType;
    beforeEach(() => {
      activepromocount = 2;
      inactivepromocount = 0;
      id = '1235-1235-1235-1235';
      updateType = 'activate';
      statusType = 'activated';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a promo record status, gets current promos, gets promos counts, and fetches notifications', async () => {
      mockApp.onPut(`promotionals/update/${id}`).reply(200);
      mockApp.onGet('promotionals').reply(200, {
        activepromos: allactivepromos,
        inactivepromos: [],
      });
      mockApp.onGet('promotionalcounts').reply(200, {
        activepromocount,
        inactivepromocount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );

      setTimeout(() => {
        const { promos, notes } = store.getState();
        expect(promos).toEqual({
          activeitems: allactivepromos,
          activeitemcount: activepromocount,
          inactiveitems: [],
          inactiveitemcount: inactivepromocount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`promotionals/update/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

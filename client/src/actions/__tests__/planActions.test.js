import * as actions from 'actions/planActions.js';
import * as mocked from 'actions/__mocks__/actions.mocks.js';

const allactiveplans = [
  [{ ...mocked.inactiveplans[0], status: 'active' }],
  ...mocked.activeplans,
];

const unreadnotifications = [mocked.unreadNotifications];
const readnotifications = [mocked.readNotifications];

describe('Plan Actions', () => {
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

  describe('Fetch Plans', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches initial plan records', async () => {
      mockApp.onGet('plans').reply(200, {
        activeplans: mocked.activeplans,
        inactiveplans: mocked.inactiveplans,
      });
      await Promise.resolve(store.dispatch(actions.fetchItems()));

      setTimeout(() => {
        const { plans } = store.getState();
        expect(plans).toEqual({
          activeitems: mocked.activeplans,
          activeitemcount: 0,
          inactiveitems: mocked.inactiveplans,
          inactiveitemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('plans').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItems()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Plans Counts', () => {
    let activeplancount;
    let inactiveplancount;
    beforeEach(() => {
      activeplancount = 5;
      inactiveplancount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches active and inactive plan counts', async () => {
      mockApp.onGet('plancounts').reply(200, {
        activeplancount,
        inactiveplancount,
      });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));

      setTimeout(() => {
        const { plans } = store.getState();
        expect(plans).toEqual({
          activeitems: [],
          activeitemcount: activeplancount,
          inactiveitems: [],
          inactiveitemcount: inactiveplancount,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('plancounts').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete Plans', () => {
    let id;
    let activeplancount;
    let inactiveplancount;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      activeplancount = 5;
      inactiveplancount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a plan and gets current plans and plans count', async () => {
      mockApp.onDelete(`plans/delete/${id}`).reply(200);
      mockApp.onGet('plans').reply(200, {
        activeplans: mocked.activeplans,
        inactiveplans: mocked.inactiveplans,
      });
      mockApp.onGet('plancounts').reply(200, {
        activeplancount,
        inactiveplancount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));

      setTimeout(() => {
        const { plans, notes } = store.getState();
        expect(plans).toEqual({
          activeitems: mocked.activeplans,
          activeitemcount: activeplancount,
          inactiveitems: mocked.inactiveplans,
          inactiveitemcount: inactiveplancount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete(`plans/delete/${id}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Next/Prev Plans', () => {
    let table;
    let page;
    let sortByNum;
    beforeEach(() => {
      table = 'Active Plans';
      page = 1;
      sortByNum = 10;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches next or previous plan records', async () => {
      mockApp
        .onGet(`plans/records?table=${table}&page=${page}&limit=${sortByNum}`)
        .reply(200, {
          activeplans: mocked.activeplans,
        });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );

      setTimeout(() => {
        const { plans } = store.getState();
        expect(plans).toEqual({
          activeitems: mocked.activeplans,
          activeitemcount: 0,
          inactiveitems: [],
          inactiveitemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp
        .onGet(`plans/records?table=${table}&page=${page}&limit=${sortByNum}`)
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Updates Plan Status', () => {
    let activeplancount;
    let inactiveplancount;
    let id;
    let updateType;
    let statusType;
    beforeEach(() => {
      activeplancount = 2;
      inactiveplancount = 0;
      id = '1235-1235-1235-1235';
      updateType = 'activate';
      statusType = 'activated';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a plan record status, gets current plans, gets plans counts, and fetches notifications', async () => {
      mockApp.onPut(`plans/update/${id}`).reply(200);
      mockApp.onGet('plans').reply(200, {
        activeplans: allactiveplans,
        inactiveplans: [],
      });
      mockApp.onGet('plancounts').reply(200, {
        activeplancount,
        inactiveplancount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );

      setTimeout(() => {
        const { plans, notes } = store.getState();
        expect(plans).toEqual({
          activeitems: allactiveplans,
          activeitemcount: activeplancount,
          inactiveitems: [],
          inactiveitemcount: inactiveplancount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`plans/update/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

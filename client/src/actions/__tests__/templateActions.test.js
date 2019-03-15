import * as actions from '../templateActions.js';
import * as mocked from '../__mocks__/actions.mocks.js';

const allactivetemplates = [
  [{ ...mocked.inactivetemplates[0], status: 'active' }],
  ...mocked.activetemplates,
];

const unreadnotifications = [mocked.unreadNotifications];
const readnotifications = [mocked.readNotifications];

describe('Template Actions', () => {
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

  describe('Fetch Templates', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches initial template records', async () => {
      mockApp.onGet('templates').reply(200, {
        activetemplates: mocked.activetemplates,
        inactivetemplates: mocked.inactivetemplates,
      });
      await Promise.resolve(store.dispatch(actions.fetchItems()));

      setTimeout(() => {
        const { templates } = store.getState();
        expect(templates).toEqual({
          activeitems: mocked.activetemplates,
          activeitemcount: 0,
          inactiveitems: mocked.inactivetemplates,
          inactiveitemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('templates').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItems()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch templates Counts', () => {
    let activetemplatescount;
    let inactivetemplatescount;
    beforeEach(() => {
      activetemplatescount = 5;
      inactivetemplatescount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches active and inactive template counts', async () => {
      mockApp.onGet('templatecounts').reply(200, {
        activetemplatescount,
        inactivetemplatescount,
      });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));

      setTimeout(() => {
        const { templates } = store.getState();
        expect(templates).toEqual({
          activeitems: [],
          activeitemcount: activetemplatescount,
          inactiveitems: [],
          inactiveitemcount: inactivetemplatescount,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('templatecounts').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete templates', () => {
    let id;
    let activetemplatescount;
    let inactivetemplatescount;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      activetemplatescount = 5;
      inactivetemplatescount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a template, gets current templates, gets templates count, and fetch notifications', async () => {
      mockApp.onDelete(`templates/delete/${id}`).reply(200);
      mockApp.onGet('templates').reply(200, {
        activetemplates: mocked.activetemplates,
        inactivetemplates: mocked.inactivetemplates,
      });
      mockApp.onGet('templatecounts').reply(200, {
        activetemplatescount,
        inactivetemplatescount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));

      setTimeout(() => {
        const { templates, notes } = store.getState();
        expect(templates).toEqual({
          activeitems: mocked.activetemplates,
          activeitemcount: activetemplatescount,
          inactiveitems: mocked.inactivetemplates,
          inactiveitemcount: inactivetemplatescount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete(`templates/delete/${id}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Next/Prev templates', () => {
    let table;
    let page;
    let sortByNum;
    beforeEach(() => {
      table = 'Active templates';
      page = 1;
      sortByNum = 10;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches next or previous template records', async () => {
      mockApp
        .onGet(
          `templates/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(200, {
          activetemplates: mocked.activetemplates,
        });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );

      setTimeout(() => {
        const { templates } = store.getState();
        expect(templates).toEqual({
          activeitems: mocked.activetemplates,
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
          `templates/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Updates Template Status', () => {
    let activetemplatescount;
    let inactivetemplatescount;
    let id;
    let updateType;
    let statusType;
    beforeEach(() => {
      activetemplatescount = 2;
      inactivetemplatescount = 0;
      id = '1235-1235-1235-1235';
      updateType = 'activate';
      statusType = 'activated';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a template record status and fetches notifications', async () => {
      mockApp.onPut(`templates/status/${id}`).reply(200);
      mockApp.onGet('templates').reply(200, {
        activetemplates: allactivetemplates,
        inactivetemplates: [],
      });
      mockApp.onGet('templatecounts').reply(200, {
        activetemplatescount,
        inactivetemplatescount,
      });
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );

      setTimeout(() => {
        const { templates, notes } = store.getState();
        expect(templates).toEqual({
          activeitems: allactivetemplates,
          activeitemcount: activetemplatescount,
          inactiveitems: [],
          inactiveitemcount: inactivetemplatescount,
        });
        expect(notes).toEqual({
          unreadNotifications: unreadnotifications,
          readNotifications: readnotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`templates/status/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.updateAction(updateType, statusType, id)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

import * as actions from '../messageActions.js';
import * as mocked from '../__mocks__/authActions.mocks.js';

describe('Message Actions', () => {
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

  describe('Fetch Messages', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches messages', async () => {
      mockApp.onGet('messages').reply(200, { messages: mocked.messages });
      await Promise.resolve(store.dispatch(actions.fetchItems()));

      setTimeout(() => {
        const { messages } = store.getState();
        expect(messages).toEqual({
          items: { ...mocked.messages },
          itemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('messages').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItems()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Messages Counts', () => {
    let messagecounts;
    beforeEach(() => {
      messagecounts = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches message counts', async () => {
      mockApp.onGet('messagecounts').reply(200, { messagecounts });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));

      setTimeout(() => {
        const { messages } = store.getState();
        expect(messages).toEqual({
          items: [],
          itemcount: messagecounts,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('messagecounts').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete Message', () => {
    let id;
    let messagecounts;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      messagecounts = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a message and gets current messages and messages count', async () => {
      mockApp.onDelete(`messages/delete/${id}`).reply(200);
      mockApp.onGet('messagecounts').reply(200, { messagecounts });
      mockApp.onGet('messages').reply(200, { messages: mocked.messages });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));

      setTimeout(() => {
        const { messages } = store.getState();
        expect(messages).toEqual({
          items: { ...mocked.messages },
          itemcount: messagecounts,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete(`messages/delete/${id}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Next/Prev Messages', () => {
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

    it('fetches the next or previous specified (default: 10) amount of records', async () => {
      mockApp
        .onGet(
          `messages/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(200, { messages: mocked.messages });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );

      setTimeout(() => {
        const { messages } = store.getState();
        expect(messages).toEqual({
          items: { ...mocked.messages },
          itemcount: 0,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp
        .onGet(
          `messages/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

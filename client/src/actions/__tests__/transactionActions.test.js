import * as actions from 'actions/transactionActions.js';
import * as mocked from 'actions/__mocks__/actions.mocks.js';

const formProps = {
  amount: '5.00',
  email: 'test@test.com',
  planname: 'Test Plan',
  processor: 'Paypal',
  subscriber: 'Test User 1',
  transactiontype: 'credit',
};

const unreadnotifications = [mocked.unreadNotifications];
const readnotifications = [mocked.readNotifications];

describe('Transaction Actions', () => {
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

  describe('Fetch Transactions', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches initial transaction records', async () => {
      mockApp.onGet('transactions').reply(200, {
        chargetransactions: mocked.chargetransactions,
        refundtransactions: mocked.refundtransactions,
      });
      await Promise.resolve(store.dispatch(actions.fetchItems()));

      setTimeout(() => {
        const { transactions } = store.getState();
        expect(transactions).toEqual({
          activeitems: mocked.chargetransactions,
          activeitemcount: 0,
          inactiveitems: mocked.refundtransactions,
          inactiveitemcount: 0,
        });
      });
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('transactions').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItems()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Transactions Counts', () => {
    let chargecount;
    let refundcount;
    beforeEach(() => {
      chargecount = 5;
      refundcount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches active and inactive transaction counts', async () => {
      mockApp.onGet('transactioncounts').reply(200, {
        chargecount,
        refundcount,
      });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));

      setTimeout(() => {
        const { transactions } = store.getState();
        expect(transactions).toEqual({
          activeitems: [],
          activeitemcount: chargecount,
          inactiveitems: [],
          inactiveitemcount: refundcount,
        });
      });
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onGet('transactioncounts').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.fetchItemCounts()));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Delete Transaction', () => {
    let id;
    let chargecount;
    let refundcount;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      chargecount = 5;
      refundcount = 5;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('deletes a transaction and gets current transactions and transactions count', async () => {
      mockApp.onDelete(`transactions/delete/${id}`).reply(200);
      mockApp.onGet('transactions').reply(200, {
        chargetransactions: mocked.chargetransactions,
        refundtransactions: mocked.refundtransactions,
      });
      mockApp.onGet('transactioncounts').reply(200, {
        chargecount,
        refundcount,
      });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));

      setTimeout(() => {
        const { transactions } = store.getState();
        expect(transactions).toEqual({
          activeitems: mocked.chargetransactions,
          activeitemcount: chargecount,
          inactiveitems: mocked.refundtransactions,
          inactiveitemcount: refundcount,
        });
      });
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onDelete(`transactions/delete/${id}`).reply(404, { err });
      await Promise.resolve(store.dispatch(actions.deleteAction(id)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Fetch Next/Prev Transactions', () => {
    let table;
    let page;
    let sortByNum;
    beforeEach(() => {
      table = 'Active Transactions';
      page = 1;
      sortByNum = 10;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('fetches next or previous transaction records', async () => {
      mockApp
        .onGet(
          `transactions/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(200, {
          chargetransactions: mocked.chargetransactions,
        });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );

      setTimeout(() => {
        const { transactions } = store.getState();
        expect(transactions).toEqual({
          activeitems: mocked.chargetransactions,
          activeitemcount: 0,
          inactiveitems: [],
          inactiveitemcount: 0,
        });
      });
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp
        .onGet(
          `transactions/records?table=${table}&page=${page}&limit=${sortByNum}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.fetchAction(table, page, sortByNum)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Updates Transaction Status', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a transaction to a refund or credit and fetches notifications', async () => {
      mockApp.onPost('transaction/refund').reply(200);
      mockApp
        .onGet('notifications')
        .reply(200, { readnotifications, unreadnotifications });
      await Promise.resolve(store.dispatch(actions.refundAction(formProps)));

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
      mockApp.onPost('transaction/refund').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.refundAction(formProps)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

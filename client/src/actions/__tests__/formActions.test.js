import * as actions from '../formActions';
import * as mocked from '../__mocks__/authActions.mocks.js';

describe('Form Actions', () => {
  let store;
  beforeEach(() => {
    store = createStoreFactory();
    mockApp.onGet('notifications').reply(200, {
      readnotifications: mocked.readNotifications,
      unreadnotifications: mocked.unreadNotifications,
    });
  });

  afterEach(() => {
    mockApp.reset();
  });

  afterAll(() => {
    mockApp.restore();
    mockAPI.restore();
  });

  describe('Add Plan', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('adds a new plan', async () => {
      mockApp.onPost('plans/create').reply(200);
      await Promise.resolve(store.dispatch(actions.addNewPlan(mocked.newPlan)));

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPost('plans/create').reply(404, { err });
      await Promise.resolve(store.dispatch(actions.addNewPlan(mocked.newPlan)));
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Add Promotional', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('adds a new promotional', async () => {
      mockApp.onPost('promotionals/create').reply(200);
      await Promise.resolve(
        store.dispatch(actions.addNewPromo(mocked.newPromo)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPost('promotionals/create').reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.addNewPromo(mocked.newPromo)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Add Template', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('adds a new template', async () => {
      mockApp.onPost('templates/create').reply(200);
      await Promise.resolve(
        store.dispatch(actions.addNewTemplate(mocked.newTemplate)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPost('templates/create').reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.addNewTemplate(mocked.newTemplate)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Apply Promotional Code', () => {
    let promocode;
    let plan;
    beforeEach(() => {
      promocode = 'PSSAVE1000PERCENT';
      plan = 'Test Plan';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('applies a promo code to a plan', async () => {
      mockApp
        .onGet(
          `promotionals/apply-promotion?promocode=${promocode}&plan=${plan}`,
        )
        .reply(200, { promotional: mocked.appliedPromoCode });
      await Promise.resolve(
        store.dispatch(actions.applyPromo(promocode, plan)),
      );

      setTimeout(() => {
        const { promos } = store.getState();
        expect(promos).toEqual({
          activeitemcount: 0,
          activeitems: [],
          inactiveitemcount: 0,
          inactiveitems: [],
          appliedPromoCode: { ...mocked.appliedPromoCode },
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp
        .onGet(
          `promotionals/apply-promotion?promocode=${promocode}&plan=${plan}`,
        )
        .reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.applyPromo(promocode, plan)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Edit Plan', () => {
    let id;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a plan', async () => {
      mockApp.onPut(`plans/edit/${id}`).reply(200);
      await Promise.resolve(
        store.dispatch(actions.editPlan(id, mocked.newPlan)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`plans/edit/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.editPlan(id, mocked.newPlan)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Edit Promo', () => {
    let id;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a promotional', async () => {
      mockApp.onPut(`promotionals/edit/${id}`).reply(200);
      await Promise.resolve(
        store.dispatch(actions.editPromo(id, mocked.newPromo)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`promotionals/edit/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.editPromo(id, mocked.newPromo)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Edit Template', () => {
    let id;
    beforeEach(() => {
      id = '1234-1234-1234-1234';
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('updates a template', async () => {
      mockApp.onPut(`templates/edit/${id}`).reply(200);
      await Promise.resolve(
        store.dispatch(actions.editTemplate(id, mocked.newTemplate)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPut(`templates/edit/${id}`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.editTemplate(id, mocked.newTemplate)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  describe('Send Message', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('sends a message to all subscribers in the plan', async () => {
      mockApp.onPost(`messages/create`).reply(200);
      await Promise.resolve(
        store.dispatch(actions.sendMessageToSubs(mocked.newTemplate)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPost(`messages/create`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.sendMessageToSubs(mocked.newTemplate)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });

  it('toggles billings fields according to contact fields', async () => {
    await store.dispatch({
      type: 'SET_BILLING_FORM_VALUES',
      payload: mocked.billingFields,
    });
    const {
      form: { CustomerPlanSignup },
    } = store.getState();
    expect(CustomerPlanSignup.values).toEqual(mocked.billingFields);

    await store.dispatch(actions.resetBillingFieldValues());
    const {
      form: { CustomerPlanSignup: NextCustomerPlanSignup },
    } = store.getState();
    expect(NextCustomerPlanSignup.values).toEqual({
      billingAddress: undefined,
      billingUnit: undefined,
      billingCity: undefined,
      billingState: undefined,
      billingZip: undefined,
    });
  });

  describe('New Subscriber', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runAllTimers();
    });

    it('creates a new subscriber', async () => {
      mockApp.onPost(`subscribers/signup`).reply(200);
      await Promise.resolve(
        store.dispatch(actions.subRegisterToPlan(mocked.newSub)),
      );

      setTimeout(() => {
        const { notes } = store.getState();
        expect(notes).toEqual({
          readNotifications: mocked.readNotifications,
          unreadNotifications: mocked.unreadNotifications,
        });
      }, 1000);
    });

    it('displays an error if unsuccessful', async () => {
      const err = 'Unable to complete that request!';
      mockApp.onPost(`subscribers/signup`).reply(404, { err });
      await Promise.resolve(
        store.dispatch(actions.subRegisterToPlan(mocked.newSub)),
      );
      const { server } = store.getState();
      expect(server.error).toEqual(err);
    });
  });
});

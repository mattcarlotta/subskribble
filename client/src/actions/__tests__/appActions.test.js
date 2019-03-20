import { resetServerMessages, serverErrorMessage } from 'actions/appActions.js';

const initialState = {
  error: '',
  message: '',
};

describe('App Actions', () => {
  let store;
  let serverError;
  beforeEach(() => {
    store = createStoreFactory();
    serverError = 'Error';
  });

  it('adds a serverError to redux state', async () => {
    await store.dispatch(serverErrorMessage(serverError));
    const {
      server: { error },
    } = store.getState();
    expect(error).toBe(serverError);
  });

  it('removes all server messages from redux state', async () => {
    await store.dispatch(serverErrorMessage(serverError));
    await store.dispatch(resetServerMessages());
    const { server } = store.getState();
    expect(server).toEqual(initialState);
  });
});

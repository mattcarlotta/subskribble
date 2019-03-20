import { getDashboardData } from 'actions/dashboardActions';

const store = createStoreFactory();
const err = 'Unable to get dashboard data.';
describe('Dashboard Actions', () => {
  it('displays an error if request is unsuccessful', async () => {
    mockApp.onGet('dashboard').reply(404, { err });
    await Promise.resolve(store.dispatch(getDashboardData()));

    const { server } = store.getState();
    expect(server.error).toEqual(err);
  });
});

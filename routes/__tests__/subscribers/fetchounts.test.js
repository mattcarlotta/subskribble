import app from 'utils/setup';
import { fetchCounts } from 'controllers/subscribers';
import { requireAuth } from 'strategies';

jest.mock('controllers/subscribers', () => ({
  ...require.requireActual('controllers/subscribers'),
  fetchCounts: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Fetch Subscribers Counts Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchCounts.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/subscribercounts')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the fetchCounts controller', async () => {
    await app()
      .get('/api/subscribercounts')
      .then(() => {
        expect(fetchCounts).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Subscriber Counts', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid subscriber counts requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/subscribercounts')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid subscriber counts requests', async () => {
//     await app()
//       .get('/api/subscribercounts')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual({
//           activesubscriberscount: expect.any(Number),
//           inactivesubscriberscount: expect.any(Number),
//         });
//       });
//   });
// });

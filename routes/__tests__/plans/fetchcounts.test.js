import app from 'utils/setup';
import { fetchCounts } from 'controllers/plans';
import { requireAuth } from 'strategies';

jest.mock('controllers/plans', () => ({
  ...require.requireActual('controllers/plans'),
  fetchCounts: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Fetch Plans Counts Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchCounts.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/plancounts')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the fetchCounts controller', async () => {
    await app()
      .get('/api/plancounts')
      .then(() => {
        expect(fetchCounts).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Plan Counts', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid plan counts requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/plancounts')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid plan counts requests', async () => {
//     await app()
//       .get('/api/plancounts')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual({
//           activeplancount: expect.any(Number),
//           inactiveplancount: expect.any(Number),
//         });
//       });
//   });
// });

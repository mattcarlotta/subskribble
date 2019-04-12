import app from 'utils/setup';
import { fetchAllActiveRecords } from 'controllers/plans';
import { requireAuth } from 'strategies';

jest.mock('controllers/plans', () => ({
  ...require.requireActual('controllers/plans'),
  fetchAllActiveRecords: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Fetch All Active Plans Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchAllActiveRecords.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/plans/only-active')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the fetchAllActiveRecords controller', async () => {
    await app()
      .get('/api/plans/only-active')
      .then(() => {
        expect(fetchAllActiveRecords).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Fetch All Active Plans', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid fetch all active plans requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/plans/only-active')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid fetch all active plans requests', async () => {
//     await app()
//       .get('/api/plans/only-active')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.activeplans).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               amount: expect.any(String),
//               description: expect.any(String),
//               planname: expect.any(String),
//             }),
//           ]),
//         );
//       });
//   });
// });

import app from 'utils/setup';
import { fetchRecords } from 'controllers/templates';
import { requireAuth } from 'strategies';

jest.mock('controllers/templates', () => ({
  ...require.requireActual('controllers/templates'),
  fetchRecords: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Fetch Template Records Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchRecords.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/templates/records')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the fetchRecords controller', async () => {
    await app()
      .get('/api/templates/records')
      .then(() => {
        expect(fetchRecords).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
// import { missingQueryParams } from 'errors';
//
// describe('Active/Inactive Template Records', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid template records requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/templates/records')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing parms
//     await app()
//       .get('/api/templates/records')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingQueryParams);
//       });
//   });
//
//   it('should handle valid template records requests', async () => {
//     await app()
//       .get('/api/templates/records?table=activetemplates&page=0&limit=10')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.activetemplates).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               status: expect.any(String),
//               plans: expect.arrayContaining([expect.any(String)]),
//               subject: expect.any(String),
//               templatename: expect.any(String),
//               uniquetemplatename: expect.any(String),
//               message: expect.any(String),
//             }),
//           ]),
//         );
//       });
//   });
// });

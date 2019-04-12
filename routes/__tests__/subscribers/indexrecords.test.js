import app from 'utils/setup';
import { index } from 'controllers/subscribers';
import { requireAuth } from 'strategies';

jest.mock('controllers/subscribers', () => ({
  ...require.requireActual('controllers/subscribers'),
  index: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Fetch Subscribers Index Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    index.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/subscribers')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the index controller', async () => {
    await app()
      .get('/api/subscribers')
      .then(() => {
        expect(index).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Subscriber Index Records', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid subscriber index record requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/subscribers')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid subscriber index record requests', async () => {
//     await app()
//       .get('/api/subscribers')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.activesubscribers).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               status: expect.any(String),
//               planname: expect.any(String),
//               credits: expect.any(String),
//               amount: expect.any(String),
//               billingaddress: expect.toBeNullOrType(typeof 'String'),
//               billingcity: expect.toBeNullOrType(typeof 'String'),
//               billingstate: expect.toBeNullOrType(typeof 'String'),
//               billingunit: expect.toBeNullOrType(typeof 'String'),
//               billingzip: expect.toBeNullOrType(typeof 'String'),
//               contactaddress: expect.toBeNullOrType(typeof 'String'),
//               contactcity: expect.toBeNullOrType(typeof 'String'),
//               contactstate: expect.toBeNullOrType(typeof 'String'),
//               contactunit: expect.toBeNullOrType(typeof 'String'),
//               contactzip: expect.toBeNullOrType(typeof 'String'),
//               contactphone: expect.toBeNullOrType(typeof 'String'),
//               promocode: expect.toBeNullOrType(typeof 'String'),
//               samebillingaddress: expect.toBeNullOrType(typeof true),
//               startdate: expect.any(String),
//               subscriber: expect.any(String),
//               enddate: expect.toBeNullOrType(typeof 'String'),
//             }),
//           ]),
//         );
//         expect(res.body.inactivesubscribers).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               status: expect.any(String),
//               planname: expect.any(String),
//               credits: expect.any(String),
//               amount: expect.any(String),
//               billingaddress: expect.toBeNullOrType(typeof 'String'),
//               billingcity: expect.toBeNullOrType(typeof 'String'),
//               billingstate: expect.toBeNullOrType(typeof 'String'),
//               billingunit: expect.toBeNullOrType(typeof 'String'),
//               billingzip: expect.toBeNullOrType(typeof 'String'),
//               contactaddress: expect.toBeNullOrType(typeof 'String'),
//               contactcity: expect.toBeNullOrType(typeof 'String'),
//               contactstate: expect.toBeNullOrType(typeof 'String'),
//               contactunit: expect.toBeNullOrType(typeof 'String'),
//               contactzip: expect.toBeNullOrType(typeof 'String'),
//               contactphone: expect.toBeNullOrType(typeof 'String'),
//               promocode: expect.toBeNullOrType(typeof 'String'),
//               samebillingaddress: expect.toBeNullOrType(typeof true),
//               startdate: expect.any(String),
//               subscriber: expect.any(String),
//               enddate: expect.toBeNullOrType(typeof 'String'),
//             }),
//           ]),
//         );
//       });
//   });
// });

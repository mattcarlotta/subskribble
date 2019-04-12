import app from 'utils/setup';
import { updateOne } from 'controllers/plans';
import { requireAuth } from 'strategies';

jest.mock('controllers/plans', () => ({
  ...require.requireActual('controllers/plans'),
  updateOne: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Update A Plan Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateOne.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .put('/api/plans/edit/null')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the updateOne controller', async () => {
    await app()
      .put('/api/plans/edit/null')
      .then(() => {
        expect(updateOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectPlanByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingUpdateParams } from 'errors';
//
// describe('Edit A Plan', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid edit plan requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/plans/edit/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .put('/api/plans/edit/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//   });
//
//   it('should handle valid edit plan requests', async () => {
//     const response = await db.one(selectPlanByKey, [12]);
//
//     await app()
//       .put(`/api/plans/edit/${response.id}`)
//       .send({
//         amount: '10.99',
//         billevery: 'Two Weeks',
//         planname: 'Carlotta Solar',
//         description: 'Carlotta Subscription',
//         setupfee: '',
//         trialperiod: '(none)',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

import app from 'utils/setup';
import { deleteOne } from 'controllers/promotionals';
import { requireAuth } from 'strategies';

jest.mock('controllers/promotionals', () => ({
  ...require.requireActual('controllers/promotionals'),
  deleteOne: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Delete A Promotional Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteOne.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .delete('/api/promotionals/delete/null')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the deleteOne controller', async () => {
    await app()
      .delete('/api/promotionals/delete/null')
      .then(() => {
        expect(deleteOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectPromotionCodeByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingDeletionParams } from 'errors';
//
// describe('Delete A Promotional', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid delete promotional requests', async () => {
//     // not logged in
//     await app()
//       .delete('/api/promotionals/delete/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing delete params
//     await app()
//       .delete('/api/promotionals/delete/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingDeletionParams);
//       });
//   });
//
//   it('should handle valid delete promotional requests', async () => {
//     const response = await db.one(selectPromotionCodeByKey, [14]);
//
//     await app()
//       .delete(`/api/promotionals/delete/${response.id}`)
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

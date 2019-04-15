import app from "utils/setup";
import { deleteOne } from "controllers/plans";
import { requireAuth } from "strategies";

jest.mock("controllers/plans", () => ({
  ...require.requireActual("controllers/plans"),
  deleteOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Delete A Plan Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .delete("/api/plans/delete/null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the deleteOne controller", async () => {
    await app()
      .delete("/api/plans/delete/null")
      .then(() => {
        expect(deleteOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectPlanByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingDeletionParams } from 'errors';
//
// describe('Delete A Plan', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid delete plan requests', async () => {
//     // not logged in
//     await app()
//       .delete('/api/plans/delete/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing delete params
//     await app()
//       .delete('/api/plans/delete/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingDeletionParams);
//       });
//   });
//
//   it('should handle valid delete plan requests', async () => {
//     const response = await db.one(selectPlanByKey, [24]);
//     await app()
//       .delete(`/api/plans/delete/${response.id}`)
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

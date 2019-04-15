import app from "utils/setup";
import { deleteOne } from "controllers/subscribers";
import { requireAuth } from "strategies";

jest.mock("controllers/subscribers", () => ({
  ...require.requireActual("controllers/subscribers"),
  deleteOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Delete A Subscriber Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .delete("/api/subscribers/delete?id=null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the deleteOne controller", async () => {
    await app()
      .delete("/api/subscribers/delete?id=null")
      .then(() => {
        expect(deleteOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectSubscriberByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingDeletionParams } from 'errors';
//
// describe('Delete A Subscriber', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid delete subscriber requests', async () => {
//     // not logged in
//     await app()
//       .delete('/api/subscribers/delete?')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing delete params
//     await app()
//       .delete('/api/subscribers/delete?')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingDeletionParams);
//       });
//   });
//
//   it('should handle valid delete subscriber requests', async () => {
//     const response = await db.one(selectSubscriberByKey, [14]);
//
//     await app()
//       .delete(
//         `/api/subscribers/delete?subscriberid=${response.id}&planname=${
//           response.planname
//         }`,
//       )
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

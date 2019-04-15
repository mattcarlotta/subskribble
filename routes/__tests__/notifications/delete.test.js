import app from "utils/setup";
import { deleteOne } from "controllers/notifications";
import { requireAuth } from "strategies";

jest.mock("controllers/notifications", () => ({
  ...require.requireActual("controllers/notifications"),
  deleteOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Delete A Notification Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    deleteOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .delete("/api/notification/delete?id=null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the deleteOne controller", async () => {
    await app()
      .delete("/api/notification/delete?id=null")
      .then(() => {
        expect(deleteOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { getNotifcationByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingDeletionParams } from 'errors';
//
// describe('Delete Notifications', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid delete notification requests', async () => {
//     // not logged in
//     await app()
//       .delete('/api/notification/delete?id=null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing delete params
//     await app()
//       .delete('/api/notification/delete?id=null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingDeletionParams);
//       });
//
//     // not logged in
//     await app()
//       .delete('/api/notifications/deleteall')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid delete notification requests', async () => {
//     // deletes one
//     const response = await db.one(getNotifcationByKey, [1]);
//     await app()
//       .delete(`/api/notification/delete?id=${response.id}`)
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//
//     // deletes all
//     await app()
//       .delete('/api/notifications/deleteall')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

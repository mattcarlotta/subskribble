import app from "utils/setup";
import { updateStatus } from "controllers/subscribers";
import { requireAuth } from "strategies";

jest.mock("controllers/subscribers", () => ({
  ...require.requireActual("controllers/subscribers"),
  updateStatus: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update A Subscriber Status Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateStatus.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .put("/api/subscribers/update/null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the updateStatus controller", async () => {
    await app()
      .put("/api/subscribers/update/null")
      .then(() => {
        expect(updateStatus).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectSubscriberByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingUpdateParams } from 'errors';
//
// describe('Update A subscriber Status', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid update subscriber status requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/subscribers/update/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing update params
//     await app()
//       .put('/api/subscribers/update/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//   });
//
//   it('should handle valid update subscriber status requests', async () => {
//     const response = await db.one(selectSubscriberByKey, [3]);
//
//     // activate subscriber
//     await app()
//       .put(`/api/subscribers/update/${response.id}`)
//       .send({
//         updateType: 'activated',
//         statusType: 'active',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//
//     // suspend subscriber
//     await app()
//       .put(`/api/subscribers/update/${response.id}`)
//       .send({
//         updateType: 'suspend',
//         statusType: 'suspended',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

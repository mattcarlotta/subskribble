import app from "utils/setup";
import { updateStatus } from "controllers/promotionals";
import { requireAuth } from "strategies";

jest.mock("controllers/promotionals", () => ({
  ...require.requireActual("controllers/promotionals"),
  updateStatus: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update A Promotional Status Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateStatus.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .put("/api/promotionals/update/null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the updateStatus controller", async () => {
    await app()
      .put("/api/promotionals/update/null")
      .then(() => {
        expect(updateStatus).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectPromotionCodeByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingUpdateParams } from 'errors';
//
// describe('Update A promotional Status', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid update promotional status requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/promotionals/update/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing update params
//     await app()
//       .put('/api/promotionals/update/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//   });
//
//   it('should handle valid update promotional status requests', async () => {
//     const response = await db.one(selectPromotionCodeByKey, [15]);
//
//     // activate promotional
//     await app()
//       .put(`/api/promotionals/update/${response.id}`)
//       .send({
//         updateType: 'activated',
//         statusType: 'active',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//
//     // suspend promotional
//     await app()
//       .put(`/api/promotionals/update/${response.id}`)
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

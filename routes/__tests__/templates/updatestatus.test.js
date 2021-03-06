import app from "utils/setup";
import { updateStatus } from "controllers/templates";
import { requireAuth } from "strategies";

jest.mock("controllers/templates", () => ({
  ...require.requireActual("controllers/templates"),
  updateStatus: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update A Template Status Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateStatus.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .put("/api/templates/status/null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the updateStatus controller", async () => {
    await app()
      .put("/api/templates/status/null")
      .then(() => {
        expect(updateStatus).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectTemplateByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingUpdateParams } from 'errors';
//
// describe('Update A Template Status', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid update template status requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/templates/status/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing update params
//     await app()
//       .put('/api/templates/status/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//   });
//
//   it('should handle valid update template status requests', async () => {
//     const response = await db.one(selectTemplateByKey, [6]);
//
//     // activate template
//     await app()
//       .put(`/api/templates/status/${response.id}`)
//       .send({
//         updateType: 'activated',
//         statusType: 'active',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//
//     // suspend template
//     await app()
//       .put(`/api/templates/status/${response.id}`)
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

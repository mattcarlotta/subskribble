import app from "utils/setup";
import { updateOne } from "controllers/templates";
import { requireAuth } from "strategies";

jest.mock("controllers/templates", () => ({
  ...require.requireActual("controllers/templates"),
  updateOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update A Template Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .put("/api/templates/edit/null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the updateOne controller", async () => {
    await app()
      .put("/api/templates/edit/null")
      .then(() => {
        expect(updateOne).toHaveBeenCalledTimes(1);
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
// describe('Edit A Template', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid edit template requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/templates/edit/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .put('/api/templates/edit/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//   });
//
//   it('should handle valid edit template requests', async () => {
//     const response = await db.one(selectTemplateByKey, [7]);
//
//     await app()
//       .put(`/api/templates/edit/${response.id}`)
//       .send({
//         fromsender: 'betatester@subskribble.com',
//         subject: 'Test Subject 2',
//         templatename: 'Test Template 2',
//         message: '<span>Test message 2<span>',
//         plans: ['Carlotta Prime'],
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

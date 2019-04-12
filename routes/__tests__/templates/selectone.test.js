import app from "utils/setup";
import { selectOne } from "controllers/templates";
import { requireAuth } from "strategies";

jest.mock("controllers/templates", () => ({
  ...require.requireActual("controllers/templates"),
  selectOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Select A Template Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    selectOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/templates/template?id=null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the selectOne controller", async () => {
    await app()
      .get("/api/templates/template?id=null")
      .then(() => {
        expect(selectOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import db from 'db';
// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { selectTemplateByKey } from 'queries';
// import { badCredentials } from 'authErrors';
// import { missingSelectParams, unableToLocate } from 'errors';
//
// describe('Select A Template', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid select a template requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/templates/template?id=null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .get('/api/templates/template?id=null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingSelectParams);
//       });
//
//     // invalid template id
//     await app()
//       .get('/api/templates/template?id=8b1df4d3-57de-11e9-8c36-77cfcffa2c78')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(unableToLocate('template'));
//       });
//   });
//
//   it('should handle valid select a template requests', async () => {
//     const response = await db.one(selectTemplateByKey, [3]);
//
//     await app()
//       .get(`/api/templates/template?id=${response.id}`)
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual(
//           expect.objectContaining({
//             id: expect.any(String),
//             key: expect.any(Number),
//             userid: expect.any(String),
//             status: expect.any(String),
//             plans: expect.arrayContaining([expect.any(String)]),
//             subject: expect.any(String),
//             templatename: expect.any(String),
//             uniquetemplatename: expect.any(String),
//             message: expect.any(String),
//           }),
//         );
//       });
//   });
// });

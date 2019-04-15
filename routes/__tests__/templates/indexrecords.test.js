import app from "utils/setup";
import { index } from "controllers/templates";
import { requireAuth } from "strategies";

jest.mock("controllers/templates", () => ({
  ...require.requireActual("controllers/templates"),
  index: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Fetch Template Index Records Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    index.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/templates")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the index controller", async () => {
    await app()
      .get("/api/templates")
      .then(() => {
        expect(index).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Template Index Records', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid template index record requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/templates')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid template index record requests', async () => {
//     await app()
//       .get('/api/templates')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.activetemplates).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               status: expect.any(String),
//               plans: expect.arrayContaining([expect.any(String)]),
//               subject: expect.any(String),
//               templatename: expect.any(String),
//               uniquetemplatename: expect.any(String),
//               message: expect.any(String),
//             }),
//           ]),
//         );
//         expect(res.body.inactivetemplates).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               status: expect.any(String),
//               plans: expect.arrayContaining([expect.any(String)]),
//               subject: expect.any(String),
//               templatename: expect.any(String),
//               uniquetemplatename: expect.any(String),
//               message: expect.any(String),
//             }),
//           ]),
//         );
//       });
//   });
// });

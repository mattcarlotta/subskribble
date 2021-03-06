import app from "utils/setup";
import { index } from "controllers/plans";
import { requireAuth } from "strategies";

jest.mock("controllers/plans", () => ({
  ...require.requireActual("controllers/plans"),
  index: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Fetch Index Plans Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    index.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/plans")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the index controller", async () => {
    await app()
      .get("/api/plans")
      .then(() => {
        expect(index).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Plan Index Records', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid plan index record requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/plans')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid plan index record requests', async () => {
//     await app()
//       .get('/api/plans')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.activeplans).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               planname: expect.any(String),
//               description: expect.any(String),
//               amount: expect.any(String),
//               setupfee: expect.toBeNullOrType(typeof 'String'),
//               billevery: expect.any(String),
//               trialperiod: expect.toBeNullOrType(typeof 'String'),
//               status: expect.any(String),
//               startdate: expect.any(String),
//               subscribers: expect.any(Number),
//             }),
//           ]),
//         );
//         expect(res.body.inactiveplans).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               id: expect.any(String),
//               key: expect.any(Number),
//               userid: expect.any(String),
//               planname: expect.any(String),
//               description: expect.any(String),
//               amount: expect.any(String),
//               setupfee: expect.toBeNullOrType(typeof 'String'),
//               billevery: expect.any(String),
//               trialperiod: expect.toBeNullOrType(typeof 'String'),
//               status: expect.any(String),
//               startdate: expect.any(String),
//               subscribers: expect.any(Number),
//             }),
//           ]),
//         );
//       });
//   });
// });

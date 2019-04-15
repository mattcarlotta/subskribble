import app from "utils/setup";
import { fetchCounts } from "controllers/templates";
import { requireAuth } from "strategies";

jest.mock("controllers/templates", () => ({
  ...require.requireActual("controllers/templates"),
  fetchCounts: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Fetch Templates Counts Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchCounts.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/templatecounts")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the fetchCounts controller", async () => {
    await app()
      .get("/api/templatecounts")
      .then(() => {
        expect(fetchCounts).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Template Counts', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid template counts requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/templatecounts')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid template counts requests', async () => {
//     await app()
//       .get('/api/templatecounts')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual({
//           activetemplatescount: expect.any(Number),
//           inactivetemplatescount: expect.any(Number),
//         });
//       });
//   });
// });

import app from "utils/setup";
import { fetchCounts } from "controllers/promotionals";
import { requireAuth } from "strategies";

jest.mock("controllers/promotionals", () => ({
  ...require.requireActual("controllers/promotionals"),
  fetchCounts: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Fetch Promotional Counts Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchCounts.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/promotionalcounts")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the fetchCounts controller", async () => {
    await app()
      .get("/api/promotionalcounts")
      .then(() => {
        expect(fetchCounts).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Promotional Counts', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid promotional counts requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/promotionalcounts')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid promotional counts requests', async () => {
//     await app()
//       .get('/api/promotionalcounts')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual({
//           activepromocount: expect.any(Number),
//           inactivepromocount: expect.any(Number),
//         });
//       });
//   });
// });

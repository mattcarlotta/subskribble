import app from "utils/setup";
import { fetchCounts } from "controllers/transactions";
import { requireAuth } from "strategies";

jest.mock("controllers/transactions", () => ({
  ...require.requireActual("controllers/transactions"),
  fetchCounts: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Fetch Transactions Counts Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    fetchCounts.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/transactioncounts")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the fetchCounts controller", async () => {
    await app()
      .get("/api/transactioncounts")
      .then(() => {
        expect(fetchCounts).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Transaction Counts', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid transaction counts requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/transactioncounts')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid transaction counts requests', async () => {
//     await app()
//       .get('/api/transactioncounts')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body).toEqual({
//           chargecount: expect.any(Number),
//           refundcount: expect.any(Number),
//         });
//       });
//   });
// });

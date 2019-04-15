import app from "utils/setup";
import { apply } from "controllers/promotionals";
import { requireAuth } from "strategies";

jest.mock("controllers/promotionals", () => ({
  ...require.requireActual("controllers/promotionals"),
  apply: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Apply A Promotional Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    apply.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/promotionals/apply-promotion?")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the apply controller", async () => {
    await app()
      .get("/api/promotionals/apply-promotion?")
      .then(() => {
        expect(apply).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
// import { invalidPromo, missingUpdateParams } from 'errors';
//
// describe('Apply Promotional To Plan', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid apply promo to plan requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/promotionals/apply-promotion?')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing params
//     await app()
//       .get('/api/promotionals/apply-promotion?')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//
//     // logged in but invalid promo
//     await app()
//       .get(
//         '/api/promotionals/apply-promotion?promocode=FREE&plan=Carlotta Prime',
//       )
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(invalidPromo);
//       });
//   });
//
//   it('should handle valid apply promo to plan requests', async () => {
//     await app()
//       .get(
//         '/api/promotionals/apply-promotion?promocode=FIRST10KACCOUNTS&plan=Carlotta Prime',
//       )
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.promotional).toEqual(
//           expect.objectContaining({
//             id: expect.any(String),
//             key: expect.any(Number),
//             userid: expect.any(String),
//             status: expect.any(String),
//             plans: expect.arrayContaining([expect.any(String)]),
//             promocode: expect.any(String),
//             amount: expect.any(Number),
//             discounttype: expect.any(String),
//             startdate: expect.any(String),
//             enddate: expect.any(String),
//             maxusage: expect.any(Number),
//             totalusage: expect.any(Number),
//           }),
//         );
//       });
//   });
// });

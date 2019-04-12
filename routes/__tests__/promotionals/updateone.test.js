import app from "utils/setup";
import { updateOne } from "controllers/promotionals";
import { requireAuth } from "strategies";

jest.mock("controllers/promotionals", () => ({
  ...require.requireActual("controllers/promotionals"),
  updateOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Update A Promotional Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .put("/api/promotionals/edit/null")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the updateOne controller", async () => {
    await app()
      .put("/api/promotionals/edit/null")
      .then(() => {
        expect(updateOne).toHaveBeenCalledTimes(1);
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
// describe('Edit A Promotional', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid edit promotional requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/promotionals/edit/null')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .put('/api/promotionals/edit/null')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//   });
//
//   it('should handle valid edit promotional requests', async () => {
//     const response = await db.one(selectPromotionCodeByKey, [13]);
//
//     await app()
//       .put(`/api/promotionals/edit/${response.id}`)
//       .send({
//         amount: 60,
//         discounttype: '%',
//         enddate: '2019-05-05 13:08:13.639-07',
//         promocode: '60PERCENTOFF',
//         plans: ['Carlotta Prime'],
//         startdate: '2019-04-05 13:08:13.641-07',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

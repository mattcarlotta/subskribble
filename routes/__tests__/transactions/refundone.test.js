import app from "utils/setup";
import { refundOne } from "controllers/transactions";
import { requireAuth } from "strategies";

jest.mock("controllers/transactions", () => ({
  ...require.requireActual("controllers/transactions"),
  refundOne: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Refund A Transaction Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    refundOne.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .post("/api/transaction/refund")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the refundOne controller", async () => {
    await app()
      .post("/api/transaction/refund")
      .then(() => {
        expect(refundOne).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
// import { missingUpdateParams, unableToLocate } from 'errors';
//
// const refund = {
//   amount: 29.99,
//   email: 'betatester6@subskribble.com',
//   planname: 'Carlotta Prime',
//   processor: 'Visa Checkout',
//   subscriber: 'Siemen Walker',
//   transactiontype: 'refund',
// };
//
// describe('Refund A Transaction', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid refund transaction requests', async () => {
//     // not logged in
//     await app()
//       .post('/api/transaction/refund')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .post('/api/transaction/refund')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingUpdateParams);
//       });
//
//     // invalid email
//     await app()
//       .post('/api/transaction/refund')
//       .send({
//         ...refund,
//         transactiontype: 'credit',
//         email: 'test@test.com',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(unableToLocate('subscriber'));
//       });
//   });
//
//   it('should handle valid refund transaction requests', async () => {
//     // refund
//     await app()
//       .post('/api/transaction/refund')
//       .set('Cookie', cookie)
//       .send(refund)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.message).toEqual(
//           `Successfully ${refund.transactiontype}ed ${refund.subscriber}.`,
//         );
//       });
//
//     // credit
//     await app()
//       .post('/api/transaction/refund')
//       .set('Cookie', cookie)
//       .send({ ...refund, transactiontype: 'credit' })
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         expect(res.body.message).toEqual(
//           `Successfully credited ${refund.subscriber}.`,
//         );
//       });
//   });
// });

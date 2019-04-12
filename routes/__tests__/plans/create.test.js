import app from "utils/setup";
import { create } from "controllers/plans";
import { requireAuth } from "strategies";

jest.mock("controllers/plans", () => ({
  ...require.requireActual("controllers/plans"),
  create: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Create A Plan Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    create.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .post("/api/plans/create")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the create controller", async () => {
    await app()
      .post("/api/plans/create")
      .then(() => {
        expect(create).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
// import { itemAlreadyExists, missingCreationParams } from 'errors';
//
// describe('Create Plan', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid create plan requests', async () => {
//     // not logged in
//     await app()
//       .post('/api/plans/create')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .post('/api/plans/create')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingCreationParams);
//       });
//
//     // plan already exists
//     await app()
//       .post('/api/plans/create')
//       .send({
//         amount: 0.99,
//         billevery: 'Monthly',
//         planname: 'Carlotta Corp',
//         description: 'Carlotta Subscription',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(itemAlreadyExists('plan'));
//       });
//   });
//
//   it('should handle valid create plan requests', async () => {
//     await app()
//       .post('/api/plans/create')
//       .send({
//         amount: 0.99,
//         billevery: 'Monthly',
//         planname: 'Carlotta Test Plan',
//         description: 'Carlotta Subscription',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

import app from "utils/setup";
import { index } from "controllers/notifications";
import { requireAuth } from "strategies";

jest.mock("controllers/notifications", () => ({
  ...require.requireActual("controllers/notifications"),
  index: jest.fn((req, res, done) => done()),
}));

jest.mock("services/strategies/requireAuth", () => jest.fn((req, res, done) => done()));

describe("Notification Index Route", () => {
  afterEach(() => {
    requireAuth.mockClear();
    index.mockClear();
  });

  it("routes initial requests to authentication middleware", async () => {
    await app()
      .get("/api/notifications")
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it("routes authenticated requests to the index controller", async () => {
    await app()
      .get("/api/notifications")
      .then(() => {
        expect(index).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Notification Index Records', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid notification index requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/notifications')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid notification index requests', async () => {
//     await app()
//       .get('/api/notifications')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         // expect(res.body.unreadnotifications).toEqual(
//         //   expect.arrayContaining([
//         //     expect.objectContaining({
//         //       id: expect.any(String),
//         //       key: expect.any(Number),
//         //       userid: expect.any(String),
//         //       read: expect.any(Boolean),
//         //       icon: expect.any(String),
//         //       messagedate: expect.any(String),
//         //       message: expect.any(String)
//         //     })
//         //   ])
//         // );
//         // expect(res.body.readnotifications).toEqual(
//         //   expect.arrayContaining([
//         //     expect.objectContaining({
//         //       id: expect.any(String),
//         //       key: expect.any(Number),
//         //       userid: expect.any(String),
//         //       read: expect.any(Boolean),
//         //       icon: expect.any(String),
//         //       messagedate: expect.any(String),
//         //       message: expect.any(String)
//         //     })
//         //   ])
//         // );
//       });
//   });
// });

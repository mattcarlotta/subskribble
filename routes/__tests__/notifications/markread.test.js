import app from 'utils/setup';
import { updateAll } from 'controllers/notifications';
import { requireAuth } from 'strategies';

jest.mock('controllers/notifications', () => ({
  ...require.requireActual('controllers/notifications'),
  updateAll: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Notification Mark All As Read Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    updateAll.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .put('/api/notification/markasread')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the updateAll controller', async () => {
    await app()
      .put('/api/notification/markasread')
      .then(() => {
        expect(updateAll).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Mark Notifications As Read', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid mark as read notification requests', async () => {
//     // not logged in
//     await app()
//       .put('/api/notification/markasread')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid mark as read notification requests', async () => {
//     await app()
//       .put('/api/notification/markasread')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

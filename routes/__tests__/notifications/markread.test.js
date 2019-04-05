const { badCredentials } = require('../../../shared/authErrors');

describe('Mark Notifications As Read', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid mark as read notification requests', async () => {
    // not logged in
    await app()
      .put('/api/notification/markasread')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid mark as read notification requests', async () => {
    await app()
      .put('/api/notification/markasread')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

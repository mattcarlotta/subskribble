const { badCredentials } = require('authErrors');

describe('Notification Index Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid notification index requests', async () => {
    // not logged in
    await app()
      .get('/api/notifications')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid notification index requests', async () => {
    await app()
      .get('/api/notifications')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        // expect(res.body.unreadnotifications).toEqual(
        //   expect.arrayContaining([
        //     expect.objectContaining({
        //       id: expect.any(String),
        //       key: expect.any(Number),
        //       userid: expect.any(String),
        //       read: expect.any(Boolean),
        //       icon: expect.any(String),
        //       messagedate: expect.any(String),
        //       message: expect.any(String)
        //     })
        //   ])
        // );
        // expect(res.body.readnotifications).toEqual(
        //   expect.arrayContaining([
        //     expect.objectContaining({
        //       id: expect.any(String),
        //       key: expect.any(Number),
        //       userid: expect.any(String),
        //       read: expect.any(Boolean),
        //       icon: expect.any(String),
        //       messagedate: expect.any(String),
        //       message: expect.any(String)
        //     })
        //   ])
        // );
      });
  });
});

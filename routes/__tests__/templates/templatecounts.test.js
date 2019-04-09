const { badCredentials } = require('authErrors');

describe('Template Counts', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid template counts requests', async () => {
    // not logged in
    await app()
      .get('/api/templatecounts')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid template counts requests', async () => {
    await app()
      .get('/api/templatecounts')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          activetemplatescount: expect.any(Number),
          inactivetemplatescount: expect.any(Number),
        });
      });
  });
});

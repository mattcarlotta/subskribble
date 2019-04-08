const { badCredentials } = require('../../../shared/authErrors');

describe('Plan Counts', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid plan counts requests', async () => {
    // not logged in
    await app()
      .get('/api/plancounts')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid plan counts requests', async () => {
    await app()
      .get('/api/plancounts')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          activeplancount: expect.any(Number),
          inactiveplancount: expect.any(Number),
        });
      });
  });
});

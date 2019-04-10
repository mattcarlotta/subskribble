import { badCredentials } from 'authErrors';

describe('Subscriber Counts', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid subscriber counts requests', async () => {
    // not logged in
    await app()
      .get('/api/subscribercounts')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid subscriber counts requests', async () => {
    await app()
      .get('/api/subscribercounts')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          activesubscriberscount: expect.any(Number),
          inactivesubscriberscount: expect.any(Number),
        });
      });
  });
});

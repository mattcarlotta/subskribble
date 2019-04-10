import app from 'utils/setup';
import getCookie from 'utils/getCookie';
import { badCredentials } from 'authErrors';

describe('Promotional Counts', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid promotional counts requests', async () => {
    // not logged in
    await app()
      .get('/api/promotionalcounts')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid promotional counts requests', async () => {
    await app()
      .get('/api/promotionalcounts')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          activepromocount: expect.any(Number),
          inactivepromocount: expect.any(Number),
        });
      });
  });
});

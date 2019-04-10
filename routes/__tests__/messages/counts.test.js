import { badCredentials } from 'authErrors';

describe('Message Counts', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid message counts requests', async () => {
    // not logged in
    await app()
      .get('/api/messagecounts')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid message counts requests', async () => {
    await app()
      .get('/api/messagecounts')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.messagecounts).toEqual(expect.any(Number));
      });
  });
});

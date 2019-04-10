import app from 'utils/setup';
import getCookie from 'utils/getCookie';
import { badCredentials } from 'authErrors';
import { missingQueryParams } from 'errors';

describe('Message Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid message records requests', async () => {
    // not logged in
    await app()
      .get('/api/messages/records')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing parms
    await app()
      .get('/api/messages/records')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingQueryParams);
      });
  });

  it('should handle valid message records requests', async () => {
    await app()
      .get('/api/messages/records?page=0&limit=10')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.messages).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              fromsender: expect.any(String),
              subject: expect.any(String),
              sentdate: expect.any(String),
              template: expect.any(String),
              plans: expect.arrayContaining([expect.any(String)]),
            }),
          ]),
        );
      });
  });
});

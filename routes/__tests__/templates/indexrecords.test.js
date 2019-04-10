import { badCredentials } from 'authErrors';

describe('Template Index Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid template index record requests', async () => {
    // not logged in
    await app()
      .get('/api/templates')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid template index record requests', async () => {
    await app()
      .get('/api/templates')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.activetemplates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              status: expect.any(String),
              plans: expect.arrayContaining([expect.any(String)]),
              subject: expect.any(String),
              templatename: expect.any(String),
              uniquetemplatename: expect.any(String),
              message: expect.any(String),
            }),
          ]),
        );
        expect(res.body.inactivetemplates).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              status: expect.any(String),
              plans: expect.arrayContaining([expect.any(String)]),
              subject: expect.any(String),
              templatename: expect.any(String),
              uniquetemplatename: expect.any(String),
              message: expect.any(String),
            }),
          ]),
        );
      });
  });
});

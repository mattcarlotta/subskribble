const { badCredentials } = require('authErrors');
const { missingQueryParams } = require('errors');

describe('Active/Inactive Template Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid template records requests', async () => {
    // not logged in
    await app()
      .get('/api/templates/records')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing parms
    await app()
      .get('/api/templates/records')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingQueryParams);
      });
  });

  it('should handle valid template records requests', async () => {
    await app()
      .get('/api/templates/records?table=activetemplates&page=0&limit=10')
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
      });
  });
});

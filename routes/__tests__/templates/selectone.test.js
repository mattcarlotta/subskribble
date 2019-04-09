const { selectTemplateByKey } = require('queries');
const { badCredentials } = require('authErrors');
const { missingSelectParams, unableToLocate } = require('errors');

describe('Select A Template', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid select a template requests', async () => {
    // not logged in
    await app()
      .get('/api/templates/template?id=null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .get('/api/templates/template?id=null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingSelectParams);
      });

    // invalid template id
    await app()
      .get('/api/templates/template?id=8b1df4d3-57de-11e9-8c36-77cfcffa2c78')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('template'));
      });
  });

  it('should handle valid select a template requests', async () => {
    const response = await db.one(selectTemplateByKey, [3]);

    await app()
      .get(`/api/templates/template?id=${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
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
        );
      });
  });
});

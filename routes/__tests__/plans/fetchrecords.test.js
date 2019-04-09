const { badCredentials } = require('authErrors');
const { missingQueryParams } = require('errors');

describe('Active/Inactive Plan Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid plan records requests', async () => {
    // not logged in
    await app()
      .get('/api/plans/records')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing parms
    await app()
      .get('/api/plans/records')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingQueryParams);
      });
  });

  it('should handle valid plan records requests', async () => {
    await app()
      .get('/api/plans/records?table=activeplans&page=0&limit=10')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.activeplans).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              planname: expect.any(String),
              description: expect.any(String),
              amount: expect.any(String),
              setupfee: expect.toBeNullOrType(typeof 'String'),
              billevery: expect.any(String),
              trialperiod: expect.toBeNullOrType(typeof 'String'),
              status: expect.any(String),
              startdate: expect.any(String),
              subscribers: expect.any(Number),
            }),
          ]),
        );
      });
  });
});

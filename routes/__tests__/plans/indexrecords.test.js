const { badCredentials } = require('authErrors');

describe('Plan Index Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid plan index record requests', async () => {
    // not logged in
    await app()
      .get('/api/plans')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid plan index record requests', async () => {
    await app()
      .get('/api/plans')
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
        expect(res.body.inactiveplans).toEqual(
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
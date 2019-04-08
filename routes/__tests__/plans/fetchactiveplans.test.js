const { badCredentials } = require('../../../shared/authErrors');

describe('Fetch All Active Plans', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid fetch all active plans requests', async () => {
    // not logged in
    await app()
      .get('/api/plans/only-active')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid fetch all active plans requests', async () => {
    await app()
      .get('/api/plans/only-active')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.activeplans).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              amount: expect.any(String),
              description: expect.any(String),
              planname: expect.any(String),
            }),
          ]),
        );
      });
  });
});

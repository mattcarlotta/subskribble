const { badCredentials } = require('authErrors');

describe('Auth Routes and Controllers', () => {
  it('should handle invalid dashboard requests', async () => {
    // not logged in
    await app()
      .get('/api/dashboard')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid dashboard requests', async () => {
    const cookie = await getCookie();

    await app()
      .get('/api/dashboard')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          subscribers: expect.any(String),
          inactivesubscribers: expect.any(String),
          plans: expect.any(String),
          popularplans: expect.objectContaining([
            {
              planname: expect.any(String),
              subscribers: expect.any(Number),
            },
          ]),
          promotionals: expect.any(String),
          popularpromotionals: expect.objectContaining([
            {
              promocode: expect.any(String),
            },
          ]),
          credits: expect.any(String),
          creditstotal: expect.any(String),
          dues: expect.any(String),
          duestotal: expect.any(String),
          charges: expect.any(String),
          chargestotal: expect.any(String),
          refunds: expect.any(String),
          refundstotal: expect.any(String),
          messages: expect.any(String),
          activetemplates: expect.any(String),
          inactivetemplates: expect.any(String),
        });
      });
  });
});

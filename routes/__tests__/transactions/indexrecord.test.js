const { badCredentials } = require('authErrors');

describe('Transaction Index Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid transaction index record requests', async () => {
    // not logged in
    await app()
      .get('/api/transactions')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid transaction index record requests', async () => {
    await app()
      .get('/api/transactions')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.chargetransactions).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              status: expect.any(String),
              invoice: expect.any(String),
              planname: expect.any(String),
              subscriber: expect.any(String),
              email: expect.any(String),
              processor: expect.any(String),
              amount: expect.any(String),
              chargedate: expect.any(String),
              refunddate: expect.toBeNullOrType(typeof 'String'),
            }),
          ]),
        );
        expect(res.body.refundtransactions).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              status: expect.any(String),
              invoice: expect.any(String),
              planname: expect.any(String),
              subscriber: expect.any(String),
              email: expect.any(String),
              processor: expect.any(String),
              amount: expect.any(String),
              chargedate: expect.toBeNullOrType(typeof 'String'),
              refunddate: expect.any(String),
            }),
          ]),
        );
      });
  });
});

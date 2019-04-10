import { badCredentials } from 'authErrors';

describe('Transaction Counts', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid transaction counts requests', async () => {
    // not logged in
    await app()
      .get('/api/transactioncounts')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid transaction counts requests', async () => {
    await app()
      .get('/api/transactioncounts')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          chargecount: expect.any(Number),
          refundcount: expect.any(Number),
        });
      });
  });
});

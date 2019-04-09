const { selectTransactionByKey } = require('queries');
const { badCredentials } = require('authErrors');
const { missingQueryParams, unableToLocate } = require('errors');

describe('Select A transaction', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid select a transaction requests', async () => {
    // not logged in
    await app()
      .get('/api/transaction/record?id=null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .get('/api/transaction/record?id=null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingQueryParams);
      });

    // invalid transaction id
    await app()
      .get('/api/transaction/record?id=8b1df4d3-57de-11e9-8c36-77cfcffa2c78')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('transaction'));
      });
  });

  it('should handle valid select a transaction requests', async () => {
    const response = await db.one(selectTransactionByKey, [3]);

    await app()
      .get(`/api/transaction/record?id=${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          email: expect.any(String),
          planname: expect.any(String),
          processor: expect.any(String),
          subscriber: expect.any(String),
        });
      });
  });
});

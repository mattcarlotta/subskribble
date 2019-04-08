const { badCredentials } = require('../../../shared/authErrors');
const { missingQueryParams } = require('../../../shared/errors');

describe('Active/Inactive Subscriber Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid subscriber records requests', async () => {
    // not logged in
    await app()
      .get('/api/subscribers/records')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing parms
    await app()
      .get('/api/subscribers/records')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingQueryParams);
      });
  });

  it('should handle valid subscriber records requests', async () => {
    await app()
      .get('/api/subscribers/records?table=activesubscribers&page=0&limit=10')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.activesubscribers).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              status: expect.any(String),
              planname: expect.any(String),
              credits: expect.any(String),
              amount: expect.any(String),
              billingaddress: expect.toBeNullOrType(String),
              billingcity: expect.toBeNullOrType(String),
              billingstate: expect.toBeNullOrType(String),
              billingunit: expect.toBeNullOrType(String),
              billingzip: expect.toBeNullOrType(String),
              contactaddress: expect.toBeNullOrType(String),
              contactcity: expect.toBeNullOrType(String),
              contactstate: expect.toBeNullOrType(String),
              contactunit: expect.toBeNullOrType(String),
              contactzip: expect.toBeNullOrType(String),
              contactphone: expect.toBeNullOrType(String),
              promocode: expect.toBeNullOrType(String),
              samebillingaddress: expect.toBeNullOrType(Boolean),
              startdate: expect.any(String),
              subscriber: expect.any(String),
              enddate: expect.toBeNullOrType(String),
            }),
          ]),
        );
      });
  });
});

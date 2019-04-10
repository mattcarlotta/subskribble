import { badCredentials } from 'authErrors';
import { missingQueryParams } from 'errors';

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
              billingaddress: expect.toBeNullOrType(typeof 'String'),
              billingcity: expect.toBeNullOrType(typeof 'String'),
              billingstate: expect.toBeNullOrType(typeof 'String'),
              billingunit: expect.toBeNullOrType(typeof 'String'),
              billingzip: expect.toBeNullOrType(typeof 'String'),
              contactaddress: expect.toBeNullOrType(typeof 'String'),
              contactcity: expect.toBeNullOrType(typeof 'String'),
              contactstate: expect.toBeNullOrType(typeof 'String'),
              contactunit: expect.toBeNullOrType(typeof 'String'),
              contactzip: expect.toBeNullOrType(typeof 'String'),
              contactphone: expect.toBeNullOrType(typeof 'String'),
              promocode: expect.toBeNullOrType(typeof 'String'),
              samebillingaddress: expect.toBeNullOrType(typeof true),
              startdate: expect.any(String),
              subscriber: expect.any(String),
              enddate: expect.toBeNullOrType(typeof 'String'),
            }),
          ]),
        );
      });
  });
});

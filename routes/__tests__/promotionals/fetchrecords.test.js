import { badCredentials } from 'authErrors';
import { missingQueryParams } from 'errors';

describe('Active/Inactive Promotional Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid promotional records requests', async () => {
    // not logged in
    await app()
      .get('/api/promotionals/records')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing parms
    await app()
      .get('/api/promotionals/records')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingQueryParams);
      });
  });

  it('should handle valid promotional records requests', async () => {
    await app()
      .get('/api/promotionals/records?table=activepromotionals&page=0&limit=10')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.activepromos).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              key: expect.any(Number),
              userid: expect.any(String),
              status: expect.any(String),
              plans: expect.arrayContaining([expect.any(String)]),
              promocode: expect.any(String),
              amount: expect.any(Number),
              discounttype: expect.any(String),
              startdate: expect.any(String),
              enddate: expect.any(String),
              maxusage: expect.any(Number),
              totalusage: expect.any(Number),
            }),
          ]),
        );
      });
  });
});

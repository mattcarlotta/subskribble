const { badCredentials } = require('../../../shared/authErrors');

describe('Promotional Index Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid promotional index record requests', async () => {
    // not logged in
    await app()
      .get('/api/promotionals')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid promotional index record requests', async () => {
    await app()
      .get('/api/promotionals')
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
        expect(res.body.inactivepromos).toEqual(
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

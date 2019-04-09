const { selectPromotionCodeByKey } = require('queries');
const { badCredentials } = require('authErrors');
const { missingSelectParams, unableToLocate } = require('errors');

describe('Select A Promotional', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid select a promotional requests', async () => {
    // not logged in
    await app()
      .get('/api/promotionals/promotional?id=null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .get('/api/promotionals/promotional?id=null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingSelectParams);
      });

    // invalid promotional id
    await app()
      .get(
        '/api/promotionals/promotional?id=8b1df4d3-57de-11e9-8c36-77cfcffa2c78',
      )
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('promotional'));
      });
  });

  it('should handle valid select a promotional requests', async () => {
    const response = await db.one(selectPromotionCodeByKey, [1]);

    await app()
      .get(`/api/promotionals/promotional?id=${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
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
        );
      });
  });
});

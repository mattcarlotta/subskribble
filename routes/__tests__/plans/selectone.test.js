const { selectPlanByKey } = require('../../../database/query');
const { badCredentials } = require('../../../shared/authErrors');
const {
  missingSelectParams,
  unableToLocate,
} = require('../../../shared/errors');

describe('Select A Plan', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid select a plan requests', async () => {
    // not logged in
    await app()
      .get('/api/plans/plan?id=null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .get('/api/plans/plan?id=null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingSelectParams);
      });

    // invalid plan id
    await app()
      .get('/api/plans/plan?id=8b1df4d3-57de-11e9-8c36-77cfcffa2c78')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('plan'));
      });
  });

  it('should handle valid select a plan requests', async () => {
    const response = await db.one(selectPlanByKey, [1]);

    await app()
      .get(`/api/plans/plan?id=${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
          amount: expect.any(String),
          billevery: expect.any(String),
          planname: expect.any(String),
          description: expect.any(String),
          setupfee: expect.toBeNullOrType(String),
          trialperiod: expect.toBeNullOrType(String),
        });
      });
  });
});

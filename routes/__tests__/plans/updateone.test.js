const { selectPlanByKey } = require('queries');
const { badCredentials } = require('authErrors');
const { missingUpdateParams } = require('errors');

describe('Edit A Plan', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid edit plan requests', async () => {
    // not logged in
    await app()
      .put('/api/plans/edit/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .put('/api/plans/edit/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingUpdateParams);
      });
  });

  it('should handle valid edit plan requests', async () => {
    const response = await db.one(selectPlanByKey, [12]);

    await app()
      .put(`/api/plans/edit/${response.id}`)
      .send({
        amount: '10.99',
        billevery: 'Two Weeks',
        planname: 'Carlotta Solar',
        description: 'Carlotta Subscription',
        setupfee: '',
        trialperiod: '(none)',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

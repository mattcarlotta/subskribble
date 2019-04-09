const { selectPlanByKey } = require('queries');
const { badCredentials } = require('authErrors');
const { missingUpdateParams } = require('errors');

describe('Update A Plan Status', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid update plan status requests', async () => {
    // not logged in
    await app()
      .put('/api/plans/update/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing update params
    await app()
      .put('/api/plans/update/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingUpdateParams);
      });
  });

  it('should handle valid update plan status requests', async () => {
    const response = await db.one(selectPlanByKey, [15]);

    // activate plan
    await app()
      .put(`/api/plans/update/${response.id}`)
      .send({
        updateType: 'activated',
        statusType: 'active',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });

    // suspend plan
    await app()
      .put(`/api/plans/update/${response.id}`)
      .send({
        updateType: 'suspend',
        statusType: 'suspended',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

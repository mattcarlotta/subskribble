const { selectSubscriberByKey } = require('../../../database/query');
const { badCredentials } = require('../../../shared/authErrors');
const { missingUpdateParams } = require('../../../shared/errors');

describe('Update A subscriber Status', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid update subscriber status requests', async () => {
    // not logged in
    await app()
      .put('/api/subscribers/update/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing update params
    await app()
      .put('/api/subscribers/update/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingUpdateParams);
      });
  });

  it('should handle valid update subscriber status requests', async () => {
    const response = await db.one(selectSubscriberByKey, [3]);

    // activate subscriber
    await app()
      .put(`/api/subscribers/update/${response.id}`)
      .send({
        updateType: 'activated',
        statusType: 'active',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });

    // suspend subscriber
    await app()
      .put(`/api/subscribers/update/${response.id}`)
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

const { selectSubscriberByKey } = require('../../../database/query');
const { badCredentials } = require('../../../shared/authErrors');
const { missingDeletionParams } = require('../../../shared/errors');

describe('Delete A Subscriber', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete subscriber requests', async () => {
    // not logged in
    await app()
      .delete('/api/subscribers/delete?')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/subscribers/delete?')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });
  });

  it('should handle valid delete subscriber requests', async () => {
    const response = await db.one(selectSubscriberByKey, [14]);

    await app()
      .delete(
        `/api/subscribers/delete?subscriberid=${response.id}&planname=${
          response.planname
        }`,
      )
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

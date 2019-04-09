const { getMessageByKey } = require('queries');
const { badCredentials } = require('authErrors');
const { missingDeletionParams } = require('errors');

describe('Delete A Message', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete message requests', async () => {
    // not logged in
    await app()
      .delete('/api/messages/delete/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/messages/delete/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });
  });

  it('should handle valid delete message requests', async () => {
    const response = await db.one(getMessageByKey, [1]);
    await app()
      .delete(`/api/messages/delete/${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});
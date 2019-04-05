const { getNotifcationByKey } = require('../../../database/query');
const { badCredentials } = require('../../../shared/authErrors');
const { missingDeletionParams } = require('../../../shared/errors');

describe('Delete Notifications', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete notification requests', async () => {
    // not logged in
    await app()
      .delete('/api/notification/delete?id=null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/notification/delete?id=null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });

    // not logged in
    await app()
      .delete('/api/notifications/deleteall')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid delete notification requests', async () => {
    // deletes one
    const response = await db.one(getNotifcationByKey, [1]);
    await app()
      .delete(`/api/notification/delete?id=${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });

    // deletes all
    await app()
      .delete('/api/notifications/deleteall')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

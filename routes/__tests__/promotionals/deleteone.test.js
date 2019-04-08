const { selectPromotionCodeByKey } = require('../../../database/query');
const { badCredentials } = require('../../../shared/authErrors');
const { missingDeletionParams } = require('../../../shared/errors');

describe('Delete A Promotional', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete promotional requests', async () => {
    // not logged in
    await app()
      .delete('/api/promotionals/delete/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/promotionals/delete/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });
  });

  it('should handle valid delete promotional requests', async () => {
    const response = await db.one(selectPromotionCodeByKey, [14]);

    await app()
      .delete(`/api/promotionals/delete/${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

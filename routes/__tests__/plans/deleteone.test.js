const { selectPlanByKey } = require('../../../database/query');
const { badCredentials } = require('../../../shared/authErrors');
const { missingDeletionParams } = require('../../../shared/errors');

describe('Delete A Plan', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete plan requests', async () => {
    // not logged in
    await app()
      .delete('/api/plans/delete/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/plans/delete/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });
  });

  it('should handle valid delete plan requests', async () => {
    const response = await db.one(selectPlanByKey, [24]);
    await app()
      .delete(`/api/plans/delete/${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

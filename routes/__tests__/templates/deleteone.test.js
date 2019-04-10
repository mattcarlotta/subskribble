import { selectTemplateByKey } from 'queries';
import { badCredentials } from 'authErrors';
import { missingDeletionParams } from 'errors';

describe('Delete A Template', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete template requests', async () => {
    // not logged in
    await app()
      .delete('/api/templates/delete/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/templates/delete/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });
  });

  it('should handle valid delete template requests', async () => {
    const response = await db.one(selectTemplateByKey, [5]);
    await app()
      .delete(`/api/templates/delete/${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

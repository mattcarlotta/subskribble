import db from 'db';
import app from 'utils/setup';
import getCookie from 'utils/getCookie';
import { selectTransactionByKey } from 'queries';
import { badCredentials } from 'authErrors';
import { missingDeletionParams } from 'errors';

describe('Delete A transaction', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid delete transaction requests', async () => {
    // not logged in
    await app()
      .delete('/api/transactions/delete/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing delete params
    await app()
      .delete('/api/transactions/delete/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });
  });

  it('should handle valid delete transaction requests', async () => {
    const response = await db.one(selectTransactionByKey, [5]);
    await app()
      .delete(`/api/transactions/delete/${response.id}`)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

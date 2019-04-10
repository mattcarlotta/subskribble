import { badCredentials } from 'authErrors';
import { itemAlreadyExists, missingCreationParams } from 'errors';

describe('Create Plan', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid create plan requests', async () => {
    // not logged in
    await app()
      .post('/api/plans/create')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .post('/api/plans/create')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCreationParams);
      });

    // plan already exists
    await app()
      .post('/api/plans/create')
      .send({
        amount: 0.99,
        billevery: 'Monthly',
        planname: 'Carlotta Corp',
        description: 'Carlotta Subscription',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(itemAlreadyExists('plan'));
      });
  });

  it('should handle valid create plan requests', async () => {
    await app()
      .post('/api/plans/create')
      .send({
        amount: 0.99,
        billevery: 'Monthly',
        planname: 'Carlotta Test Plan',
        description: 'Carlotta Subscription',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

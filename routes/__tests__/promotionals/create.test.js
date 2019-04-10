import { badCredentials } from 'authErrors';
import { itemAlreadyExists, missingCreationParams } from 'errors';

describe('Create Promotional', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid create promotional requests', async () => {
    // not logged in
    await app()
      .post('/api/promotionals/create')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .post('/api/promotionals/create')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCreationParams);
      });

    // promotional already exists
    await app()
      .post('/api/promotionals/create')
      .send({
        amount: 5,
        discounttype: '%',
        enddate: '2019-05-05 13:08:13.639-07',
        promocode: 'FIRST10KACCOUNTS',
        plans: ['Carlotta Prime'],
        startdate: '2019-04-05 13:08:13.641-07',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(itemAlreadyExists('promotional'));
      });
  });

  it('should handle valid create promotional requests', async () => {
    await app()
      .post('/api/promotionals/create')
      .send({
        amount: 5,
        discounttype: '%',
        enddate: '2019-05-05 13:08:13.639-07',
        promocode: '5PERCENTACCOUNTS',
        plans: ['Carlotta Prime'],
        startdate: '2019-04-05 13:08:13.641-07',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

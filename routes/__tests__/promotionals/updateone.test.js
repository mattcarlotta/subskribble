import { selectPromotionCodeByKey } from 'queries';
import { badCredentials } from 'authErrors';
import { missingUpdateParams } from 'errors';

describe('Edit A Promotional', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid edit promotional requests', async () => {
    // not logged in
    await app()
      .put('/api/promotionals/edit/null')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .put('/api/promotionals/edit/null')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingUpdateParams);
      });
  });

  it('should handle valid edit promotional requests', async () => {
    const response = await db.one(selectPromotionCodeByKey, [13]);

    await app()
      .put(`/api/promotionals/edit/${response.id}`)
      .send({
        amount: 60,
        discounttype: '%',
        enddate: '2019-05-05 13:08:13.639-07',
        promocode: '60PERCENTOFF',
        plans: ['Carlotta Prime'],
        startdate: '2019-04-05 13:08:13.641-07',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

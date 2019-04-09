const { badCredentials } = require('authErrors');
const {
  duplicateSub,
  missingCreationParams,
  unableToLocate,
} = require('../../../shared/errors');

const newsubscriber = {
  billingAddress: 'Test Address',
  billingCity: 'Test City',
  billingState: 'CA',
  billingUnit: undefined,
  billingZip: '55555',
  contactAddress: 'Test Address',
  contactCity: 'Test City',
  contactEmail: 'carlotta.matt@gmail.com',
  contactPhone: '(555) 555-5555',
  contactState: 'CA',
  contactZip: '95124',
  creditCard: '1111-1111-1111-1111',
  creditCardCVV: '111',
  creditCardExpMonth: '11',
  creditCardExpYear: '1111',
  sameBillingAddress: true,
  selectedPlan: 'Carlotta Prime',
  subscriber: 'Beta Tester',
};

describe('Create Subscriber', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid create subscriber requests', async () => {
    // not logged in
    await app()
      .post('/api/subscribers/signup')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .post('/api/subscribers/signup')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCreationParams);
      });

    // invalid plan
    await app()
      .post('/api/subscribers/signup')
      .send({
        ...newsubscriber,
        selectedPlan: 'Invalid Plan',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('plan'));
      });

    // subscriber already exists
    await app()
      .post('/api/subscribers/signup')
      .send({
        ...newsubscriber,
        contactEmail: 'betatester1@subskribble.com',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(
          duplicateSub('betatester1@subskribble.com', 'Carlotta Prime'),
        );
      });
  });

  it('should handle valid create subscriber requests', async () => {
    await app()
      .post('/api/subscribers/signup')
      .send(newsubscriber)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});
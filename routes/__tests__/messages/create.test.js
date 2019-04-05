const { badCredentials } = require('../../../shared/authErrors');
const {
  missingCreationParams,
  unableToLocate,
} = require('../../../shared/errors');

describe('Auth Routes and Controllers', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid dashboard apps', async () => {
    // not logged in
    await app()
      .post('/api/messages/create')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .post('/api/messages/create')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCreationParams);
      });

    // invalid template
    await app()
      .post('/api/messages/create')
      .send({ template: 'Bad Template' })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('template'));
      });
  });

  it('should handle invalid dashboard apps', async () => {
    // not logged in
    await app()
      .post('/api/messages/create')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .post('/api/messages/create')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCreationParams);
      });

    // invalid template
    await app()
      .post('/api/messages/create')
      .send({ template: 'Bad Template' })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(unableToLocate('template'));
      });
  });
});

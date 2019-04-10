import mailer from '@sendgrid/mail';
import { badCredentials } from 'authErrors';
import { missingCreationParams, unableToLocate } from 'errors';

describe('Create Message', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should handle invalid create message requests', async () => {
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

  it('should handle valid create message requests', async () => {
    // invalid template
    await app()
      .post('/api/messages/create')
      .send({ template: 'Partners Template' })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(mailer.sendMultiple).toHaveBeenCalled();
      });
  });
});

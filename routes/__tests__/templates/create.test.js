import app from 'utils/setup';
import getCookie from 'utils/getCookie';
import { badCredentials } from 'authErrors';
import { itemAlreadyExists, missingCreationParams } from 'errors';

const newtemplate = {
  fromsender: 'betatester@subskribble.com',
  subject: 'Test Subject',
  templatename: 'Test Template',
  message: '<span>Test message<span>',
  plans: ['Carlotta Prime'],
};

describe('Create Template', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid create template requests', async () => {
    // not logged in
    await app()
      .post('/api/templates/create')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing create params
    await app()
      .post('/api/templates/create')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCreationParams);
      });

    // template already exists
    await app()
      .post('/api/templates/create')
      .send({
        ...newtemplate,
        templatename: 'Affiliates Template',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(itemAlreadyExists('template'));
      });
  });

  it('should handle valid create template requests', async () => {
    await app()
      .post('/api/templates/create')
      .send(newtemplate)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
      });
  });
});

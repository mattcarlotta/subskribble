const request = require('supertest');
const db = require('../../../database/db');
const { badCredentials } = require('../../../shared/authErrors');
const { seedUser, signIn } = require('../../../utils/__mocks__');

describe('Sign In', () => {
  let cookies;
  beforeAll(async () => {
    await seedUser();
    cookies = await signIn();
  });

  afterAll(async () => {
    await db.none('TRUNCATE users RESTART IDENTITY CASCADE');
  });

  it('handles invalid sign in requests', async () => {
    await request(app)
      .post('/api/signin')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('handles valid sign in requests', async () => {
    expect(cookies).toBeDefined();
  });
});

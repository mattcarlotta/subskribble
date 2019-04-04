const request = require('supertest');
// const db = require('../../../database/db');
const { badCredentials } = require('../../../shared/authErrors');
const { cleanDB, seedUser, signIn } = require('../../../utils/__mocks__');

describe('Sign In', () => {
  let cookies;
  beforeAll(async () => {
    await cleanDB();
    await seedUser();
    cookies = await signIn();
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

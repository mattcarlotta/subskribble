const { badCredentials } = require('../../../shared/authErrors');

describe('Sign In', () => {
  it('handles invalid sign in requests', async () => {
    await request(app)
      .post('/api/signin')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('handles valid sign in requests', async () => {
    await request(app)
      .post('/api/signin')
      .send({
        email: 'betatester@subskribble.com',
        password: 'password123',
      })
      .expect(201);
  });
});

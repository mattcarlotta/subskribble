import app from 'utils/setup';
import getCookie from 'utils/getCookie';

describe('Logged In', () => {
  it('handles invalid/expired logged in session requests', async () => {
    await app()
      .get('/api/loggedin')
      .expect(200);
  });

  it('handles valid logged in session requests', async () => {
    const cookie = await getCookie();
    await app()
      .get('/api/loggedin')
      .set('Cookie', cookie)
      .expect(201);
  });
});

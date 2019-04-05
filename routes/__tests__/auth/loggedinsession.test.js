describe('Logged In', () => {
  it('handles invalid/expired logged in session apps', async () => {
    await app()
      .get('/api/loggedin')
      .expect(200);
  });

  it('handles valid logged in session apps', async () => {
    const cookie = await getCookie('betatester@subskribble.com', 'password123');
    await app()
      .get('/api/loggedin')
      .set('Cookie', cookie)
      .expect(201);
  });
});

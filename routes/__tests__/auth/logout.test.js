describe('Log out', () => {
  it('handles log out session apps', async () => {
    await app()
      .post('/api/logout')
      .expect(200)
      .then((res) => {
        expect(res.text).toBe('Cookie deleted.');
      });
  });
});

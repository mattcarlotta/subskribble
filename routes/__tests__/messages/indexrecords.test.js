import { badCredentials } from 'authErrors';

describe('Message Index Records', () => {
  let cookie;
  beforeAll(async () => {
    cookie = await getCookie();
  });

  it('should handle invalid message index records requests', async () => {
    // not logged in
    await app()
      .get('/api/messages')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });
  });

  it('should handle valid message index records requests', async () => {
    await app()
      .get('/api/messages')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        // expect(res.body.messages).toEqual(
        //   expect.arrayContaining([
        //     expect.objectContaining({
        //       id: expect.any(String),
        //       key: expect.any(Number),
        //       userid: expect.any(String),
        //       fromsender: expect.any(String),
        //       subject: expect.any(String),
        //       sentdate: expect.any(String),
        //       template: expect.any(String),
        //       plans: expect.arrayContaining([expect.any(String)])
        //     })
        //   ])
        // );
      });
  });
});

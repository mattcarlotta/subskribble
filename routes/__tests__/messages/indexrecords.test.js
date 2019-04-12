import app from 'utils/setup';
import { index } from 'controllers/messages';
import { requireAuth } from 'strategies';

jest.mock('controllers/messages', () => ({
  ...require.requireActual('controllers/messages'),
  index: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Index Message Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    index.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .get('/api/messages')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the index controller', async () => {
    await app()
      .get('/api/messages')
      .then(() => {
        expect(index).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
//
// describe('Message Index Records', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid message index records requests', async () => {
//     // not logged in
//     await app()
//       .get('/api/messages')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//   });
//
//   it('should handle valid message index records requests', async () => {
//     await app()
//       .get('/api/messages')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         // expect(res.body.messages).toEqual(
//         //   expect.arrayContaining([
//         //     expect.objectContaining({
//         //       id: expect.any(String),
//         //       key: expect.any(Number),
//         //       userid: expect.any(String),
//         //       fromsender: expect.any(String),
//         //       subject: expect.any(String),
//         //       sentdate: expect.any(String),
//         //       template: expect.any(String),
//         //       plans: expect.arrayContaining([expect.any(String)])
//         //     })
//         //   ])
//         // );
//       });
//   });
// });

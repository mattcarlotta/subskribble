import app from 'utils/setup';
import { create } from 'controllers/promotionals';
import { requireAuth } from 'strategies';

jest.mock('controllers/promotionals', () => ({
  ...require.requireActual('controllers/promotionals'),
  create: jest.fn((req, res, done) => done()),
}));

jest.mock('services/strategies/requireAuth', () => jest.fn((req, res, done) => done()));

describe('Create A Promotional Route', () => {
  afterEach(() => {
    requireAuth.mockClear();
    create.mockClear();
  });

  it('routes initial requests to authentication middleware', async () => {
    await app()
      .post('/api/promotionals/create')
      .then(() => {
        expect(requireAuth).toHaveBeenCalledTimes(1);
      });
  });

  it('routes authenticated requests to the create controller', async () => {
    await app()
      .post('/api/promotionals/create')
      .then(() => {
        expect(create).toHaveBeenCalledTimes(1);
      });
  });
});

// import app from 'utils/setup';
// import getCookie from 'utils/getCookie';
// import { badCredentials } from 'authErrors';
// import { itemAlreadyExists, missingCreationParams } from 'errors';
//
// describe('Create Promotional', () => {
//   let cookie;
//   beforeAll(async () => {
//     cookie = await getCookie();
//   });
//
//   it('should handle invalid create promotional requests', async () => {
//     // not logged in
//     await app()
//       .post('/api/promotionals/create')
//       .then((res) => {
//         expect(res.statusCode).toEqual(401);
//         expect(res.body.err).toEqual(badCredentials);
//       });
//
//     // logged in but missing create params
//     await app()
//       .post('/api/promotionals/create')
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(missingCreationParams);
//       });
//
//     // promotional already exists
//     await app()
//       .post('/api/promotionals/create')
//       .send({
//         amount: 5,
//         discounttype: '%',
//         enddate: '2019-05-05 13:08:13.639-07',
//         promocode: 'FIRST10KACCOUNTS',
//         plans: ['Carlotta Prime'],
//         startdate: '2019-04-05 13:08:13.641-07',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(400);
//         expect(res.body.err).toEqual(itemAlreadyExists('promotional'));
//       });
//   });
//
//   it('should handle valid create promotional requests', async () => {
//     await app()
//       .post('/api/promotionals/create')
//       .send({
//         amount: 5,
//         discounttype: '%',
//         enddate: '2019-05-05 13:08:13.639-07',
//         promocode: '5PERCENTACCOUNTS',
//         plans: ['Carlotta Prime'],
//         startdate: '2019-04-05 13:08:13.641-07',
//       })
//       .set('Cookie', cookie)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//       });
//   });
// });

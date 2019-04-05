const {
  badCredentials,
  invalidPassword,
} = require('../../../shared/authErrors');
const { missingDeletionParams } = require('../../../shared/errors');
const { removedAccountSuccess } = require('../../../shared/authSuccess');
const {
  removeNewUser,
  signupNewUser,
} = require('../../__mocks__/auth.mocks.js');

const newSignupEmail = 'deleteduser@test.com';
const newSignupPassword = 'password123';
const newCompany = 'Delete Handlers LLC';

describe('Delete Account', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  afterAll(async () => {
    await removeNewUser(newSignupEmail, db);
  });

  it('handles invalid delete account apps', async () => {
    // not logged in
    await app()
      .delete('/api/delete-account')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    const cookie = await getCookie(newSignupEmail, newSignupPassword);

    // logged in but missing params
    await app()
      .delete('/api/delete-account')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingDeletionParams);
      });

    // invalid supplied password
    await app()
      .delete('/api/delete-account')
      .send({
        company: 'Test',
        user: 'betatester@subskribble.com',
        password: 'invalidpassword',
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(invalidPassword);
      });
  });

  it('handles valid delete account apps', async () => {
    const cookie = await getCookie(newSignupEmail, newSignupPassword);
    await app()
      .delete('/api/delete-account')
      .send({
        company: newCompany,
        user: newSignupEmail,
        password: newSignupPassword,
      })
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(202);
        expect(res.body.message).toEqual(removedAccountSuccess);
      });
  });
});

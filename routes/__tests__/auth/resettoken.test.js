const mailer = require('@sendgrid/mail');
const { missingEmailCreds } = require('../../../shared/authErrors');
const { passwordResetToken } = require('../../../shared/authSuccess');
const {
  removeNewUser,
  signupNewUser,
} = require('../../__mocks__/auth.mocks.js');

const newSignupEmail = 'reset@example.com';
const newCompany = 'Reset Token Corp';

describe('Reset Token', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  afterAll(async () => {
    await removeNewUser(newSignupEmail, db);
    jest.clearAllMocks();
  });

  it('handles invalid reset token apps', async () => {
    // missing email creds
    await app()
      .put('/api/reset-token')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingEmailCreds);
      });

    // invalid email creds
    await app()
      .put('/api/reset-token')
      .send({ email: 'test@test.com', password: 'reset-token' })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingEmailCreds);
      });
  });

  it('handles valid reset token apps', async () => {
    await app()
      .put('/api/reset-token')
      .send({ email: newSignupEmail, password: 'reset-token' })
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(passwordResetToken(newSignupEmail));
        expect(mailer.send).toHaveBeenCalled();
      });
  });
});

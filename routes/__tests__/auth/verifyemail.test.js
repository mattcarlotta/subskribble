const { getTokenByEmail } = require('../../../database/query');
const { createRandomToken } = require('../../../shared/helpers');
const { invalidToken, missingToken } = require('../../../shared/authErrors');
const {
  removeNewUser,
  signupNewUser,
} = require('../../__mocks__/auth.mocks.js');

const newSignupEmail = 'verification@example.com';
const newCompany = 'Verification Corp';

describe('Email Verification', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  afterAll(async () => {
    await removeNewUser(newSignupEmail, db);
  });

  it('handles invalid email verification requests', async () => {
    // missing token
    await request(app)
      .put('/api/email/verify?')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingToken);
      });

    // invalid token
    await request(app)
      .put(`/api/email/verify?token=${createRandomToken()}`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(invalidToken);
      });
  });

  it('handles valid email verification requests', async () => {
    const response = await db.one(getTokenByEmail, [newSignupEmail]);
    await request(app)
      .put(`/api/email/verify?token=${response.token}`)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual(newSignupEmail);
      });
  });
});

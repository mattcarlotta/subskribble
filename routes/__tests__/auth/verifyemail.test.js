import { getTokenByEmail } from 'queries';
import { createRandomToken } from 'helpers';
import { invalidToken, missingToken } from 'authErrors';
import signupNewUser from '../../__mocks__/auth.mocks';

const newSignupEmail = 'verification@example.com';
const newCompany = 'Verification Corp';

describe('Email Verification', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  it('handles invalid email verification requests', async () => {
    // missing token
    await app()
      .put('/api/email/verify?')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingToken);
      });

    // invalid token
    await app()
      .put(`/api/email/verify?token=${createRandomToken()}`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(invalidToken);
      });
  });

  it('handles valid email verification requests', async () => {
    const response = await db.one(getTokenByEmail, [newSignupEmail]);
    await app()
      .put(`/api/email/verify?token=${response.token}`)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.email).toEqual(newSignupEmail);
      });
  });
});

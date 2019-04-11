import db from 'db';
import app from 'utils/setup';
import { getTokenByEmail } from 'queries';
import { createRandomToken } from 'helpers';
import {
  invalidPassword,
  invalidToken,
  missingToken,
  notUniquePassword,
} from 'authErrors';
import { passwordResetSuccess } from 'authSuccess';
import signupNewUser from '../../__mocks__/helpers';

const newSignupEmail = 'newuser@test.com';
const newCompany = 'New User Corp';

describe('Reset Password', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('handles invalid reset password requests', async () => {
    // missing token
    await app()
      .put('/api/reset-password/verify')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingToken);
      });

    // missing email and/or password
    await app()
      .put(`/api/reset-password/verify?token=${createRandomToken()}`)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(invalidPassword);
      });

    // invalid token
    await app()
      .put(`/api/reset-password/verify?token=${createRandomToken()}`)
      .send({ email: newSignupEmail, password: 'newpassword' })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(invalidToken);
      });

    // password is the same
    const response = await db.one(getTokenByEmail, [newSignupEmail]);
    await app()
      .put(`/api/reset-password/verify?token=${response.token}`)
      .send({ email: newSignupEmail, password: 'password123' })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(notUniquePassword);
      });
  });

  it('handles valid reset password requests', async () => {
    const response = await db.one(getTokenByEmail, [newSignupEmail]);
    await app()
      .put(`/api/reset-password/verify?token=${response.token}`)
      .send({ email: newSignupEmail, password: 'newpassword' })
      .expect(201)
      .then((res) => {
        expect(res.body.message).toEqual(passwordResetSuccess(newSignupEmail));
      });
  });
});

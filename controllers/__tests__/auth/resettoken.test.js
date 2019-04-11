import passport from 'passport';
import { resetToken } from 'controllers/auth';
import { missingEmailCreds } from 'authErrors';
import { passwordResetToken } from 'authSuccess';
import { mockRequest, mockResponse } from '../../__mocks__/helpers';

describe('Reset Token Controller', () => {
  it('handles missing email requests', async () => {
    const req = mockRequest(null, { email: '' });
    const res = mockResponse();

    await resetToken(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingEmailCreds,
    });
  });

  it('handles invalid requests to the reset token strategy', async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback('Invalid email.', ''));

    const req = mockRequest(null, { email: 'resettoken@test.com' });
    const res = mockResponse();
    await resetToken(req, res);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: 'Invalid email.',
    });
    passport.authenticate.mockRestore();
  });

  it('handles valid requests to the reset token strategy', async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback('', 'resettoken@test.com'));

    const req = mockRequest(null, {
      email: 'resettoken@test.com',
      password: 'fakepassword',
    });
    const res = mockResponse();
    await resetToken(req, res);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      passwordResetToken('resettoken@test.com'),
    );
    passport.authenticate.mockRestore();
  });
});

import passport from 'passport';
import { resetPassword } from 'controllers/auth';
import { invalidPassword, missingToken } from 'authErrors';
import { passwordResetSuccess } from 'authSuccess';
import { mockRequest, mockResponse } from '../../__mocks__/helpers';

describe('Reset Password Controller', () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it('handles missing token requests', async () => {
    const req = mockRequest(null, null, { token: '' });

    await resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingToken,
    });
  });

  it('handles missing body requests', async () => {
    const req = mockRequest(
      null,
      { email: '', password: '' },
      { token: '123' },
    );

    await resetPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidPassword,
    });
  });

  it('handles invalid token requests to the reset passport strategy', async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback('Invalid token.', ''));

    const req = mockRequest(
      null,
      { email: 'resetpassword@test.com', password: 'password123' },
      { token: '123' },
    );

    await resetPassword(req, res);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: 'Invalid token.',
    });
    passport.authenticate.mockRestore();
  });

  it('handles valid token requests to the reset passport strategy', async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback('', 'resetpassword@test.com'));

    const req = mockRequest(
      null,
      { email: 'resetpassword@test.com', password: 'password123' },
      { token: '123' },
    );

    await resetPassword(req, res);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: passwordResetSuccess('resetpassword@test.com'),
    });
    passport.authenticate.mockRestore();
  });
});

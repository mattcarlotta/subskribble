import passport from 'passport';
import { create } from 'controllers/auth';
import { missingCredentials } from 'authErrors';
import { thanksForReg } from 'authSuccess';
import { mockRequest, mockResponse } from '../../__mocks__/helpers';

const emptybody = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  company: '',
};

const accountAlreadyExists = {
  email: 'betatester@subskribble.com',
  password: 'password123',
  firstName: 'Beta',
  lastName: 'Tester',
  company: 'Subskribble',
};

const newAccount = {
  email: 'newaccount@test.com',
  password: 'password123',
  firstName: 'New',
  lastName: 'Account',
  company: 'New Account LLC',
};

describe('Create Account Controller', () => {
  let res;
  beforeEach(() => {
    res = mockResponse();
  });

  it('handles empty body requests', async () => {
    const req = mockRequest(null, emptybody);

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingCredentials,
    });
  });

  it('handles invalid requests to the signup strategy', async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback('That account already exists.'));

    const req = mockRequest(null, accountAlreadyExists);

    await create(req, res);

    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: 'That account already exists.',
    });

    passport.authenticate.mockRestore();
  });

  it('handles valid requests to the signup strategy', async () => {
    passport.authenticate = jest.fn((strategy, callback) => () => callback(''));

    const req = mockRequest(null, newAccount);

    await create(req, res);

    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      thanksForReg(req.body.email, req.body.firstName, req.body.lastName),
    );

    passport.authenticate.mockRestore();
  });
});

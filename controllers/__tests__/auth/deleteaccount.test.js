import db from 'db';
import { findUserByEmail } from 'queries';
import { deleteAccount } from 'controllers/auth';
import { missingDeletionParams } from 'errors';
import { invalidPassword, unableLocatePass } from 'authErrors';
import { removedAccountSuccess } from 'authSuccess';
import {
  mockRequest,
  mockResponse,
  signupNewUser,
} from '../../__mocks__/helpers';

const newSignupEmail = 'deleteduser@test.com';
const newCompany = 'Delete Handlers LLC';

const emptybody = {
  company: '',
  reason: '',
  password: '',
  user: '',
};

const badPassword = {
  company: 'Subskribble',
  reason: '',
  password: 'test',
  user: 'betatester@subskribble.com',
};

const deleteAccountProps = {
  company: 'Subskribble',
  reason: '',
  password: 'password123',
  user: 'betatester@subskribble.com',
};

describe('Delete Account Controller', () => {
  let user;
  beforeEach(async () => {
    user = await db.one(findUserByEmail, [newSignupEmail]);
  });

  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  it('handles empty request calls', async () => {
    const req = mockRequest(null, emptybody);
    const res = mockResponse();

    await deleteAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingDeletionParams,
    });
  });

  it('handles invalid user id', async () => {
    const req = mockRequest(
      { ...user, id: '111b1cbe-1bb1-11e1-1111-11e1a11111c1' },
      deleteAccountProps,
    );
    const res = mockResponse();

    await deleteAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableLocatePass,
    });
  });

  it('handles invalid user passwords', async () => {
    const req = mockRequest(user, badPassword);
    const res = mockResponse();

    await deleteAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidPassword,
    });
  });

  it('handles valid delete account requests', async () => {
    const req = mockRequest(user, deleteAccountProps);
    const res = mockResponse();

    await deleteAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      message: removedAccountSuccess,
    });
  });
});

import mailer from '@sendgrid/mail';
import { updateAccount } from 'controllers/auth';
import {
  companyAlreadyExists,
  invalidPassword,
  notUniquePassword,
  unableLocatePass,
} from 'authErrors';
import {
  passwordResetSuccess,
  updatedAccount,
  updatedAccountDetails,
} from 'authSuccess';
import { missingUpdateParams } from 'errors';
import { mockRequest, mockResponse, signupUser } from '../../__mocks__/helpers';

const newSignupEmail = 'updateaccount@test.com';
const newSignupPassword = 'password123';
const newCompany = 'New Company LLC';

const emptybody = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  company: '',
};

const newAccount = {
  email: newSignupEmail,
  currentPassword: newSignupPassword,
  firstName: 'New',
  lastName: 'Account',
  company: newCompany,
};

const companyExists = {
  ...newAccount,
  company: 'Subskribble',
};

const invalidAccountPassword = {
  ...newAccount,
  currentPassword: 'invalid',
};

const sameAccountPassword = {
  ...newAccount,
  updatedPassword: 'password123',
};

// /

const newAccountInfo = {
  email: newSignupEmail,
  currentPassword: newSignupPassword,
  firstName: 'Beta',
  lastName: 'Tester',
  company: 'New Account LLC',
};

const updateAccountPassword = {
  ...newAccountInfo,
  updatedPassword: '123password',
};

const newEmailAccount = {
  ...newAccountInfo,
  email: 'newaccountemail@test.com',
  currentPassword: '123password',
};

describe('Update Account Controller', () => {
  let user;
  beforeAll(async () => {
    user = await signupUser(newSignupEmail, newCompany);
  });

  it('handles empty body requests', async () => {
    const req = mockRequest(null, emptybody);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingUpdateParams,
    });
  });

  it('handles invalid session id with a body request', async () => {
    const req = mockRequest(
      { id: '008b2cbe-5bb6-11e9-8d9f-9fe6a40024c0' },
      newAccount,
    );
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableLocatePass,
    });
  });

  it('handles invalid requests to update a company name to a name that already exists', async () => {
    const req = mockRequest(user, companyExists);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: companyAlreadyExists,
    });
  });

  it('handles invalid requests to update an account with an invalid password', async () => {
    const req = mockRequest(user, invalidAccountPassword);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: invalidPassword,
    });
  });

  it('handles invalid requests to update an account with the same password', async () => {
    const req = mockRequest(user, sameAccountPassword);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: notUniquePassword,
    });
  });

  it('handles valid requests to update non-essential account info', async () => {
    const req = mockRequest(user, newAccountInfo);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user,
      fetchnotifications: true,
      message: updatedAccountDetails,
    });
  });

  it('handles valid requests to update the account password', async () => {
    const req = mockRequest(user, updateAccountPassword);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: '',
      fetchnotifications: false,
      message: passwordResetSuccess(updateAccountPassword.email),
    });
  });

  it('handles valid requests to update the account email', async () => {
    const req = mockRequest(user, newEmailAccount);
    const res = mockResponse();

    await updateAccount(req, res);
    expect(mailer.send).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: updatedAccount,
    });
  });
});

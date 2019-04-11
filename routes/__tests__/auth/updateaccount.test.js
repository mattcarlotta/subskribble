import app from 'utils/setup';
import getCookie from 'utils/getCookie';
import mailer from '@sendgrid/mail';
import { badCredentials } from 'authErrors';
import { missingUpdateParams } from 'errors';
import {
  passwordResetSuccess,
  updatedAccount,
  updatedAccountDetails,
} from 'authSuccess';
import signupNewUser from '../../__mocks__/helpers';

const newSignupEmail = 'updateaccount@test.com';
const newSignupPassword = 'password123';
const newCompany = 'Account Update LLC';
const updatedPassword = '123password';
const updatedEmail = 'changedaccountemail@test.com';

const updatedAccountProps = {
  company: 'New Account Update',
  firstName: 'Bob',
  lastName: 'Smith',
};

const updateNonEssentialAcctDetails = {
  email: newSignupEmail,
  currentPassword: newSignupPassword,
  ...updatedAccountProps,
};

const changeAcctPassword = {
  email: newSignupEmail,
  company: 'New Account Update',
  firstName: 'Bob',
  lastName: 'Smith',
  currentPassword: newSignupPassword,
  updatedPassword,
};

const changeAcctEmail = {
  email: updatedEmail,
  currentPassword: updatedPassword,
  ...updatedAccountProps,
};

describe('Update Account', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('handles invalid update account requests', async () => {
    // not logged in
    await app()
      .put('/api/update-account')
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(res.body.err).toEqual(badCredentials);
      });

    // logged in but missing update query params
    const cookie = await getCookie(newSignupEmail, newSignupPassword);
    await app()
      .put('/api/update-account')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingUpdateParams);
      });
  });

  it('handles valid account update requests', async () => {
    // updates company, first name and lastname
    let cookie = await getCookie(newSignupEmail, newSignupPassword);
    await app()
      .put('/api/update-account')
      .send(updateNonEssentialAcctDetails)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.user).toMatchObject({
          collapsesidenav: expect.any(Boolean),
          company: updateNonEssentialAcctDetails.company,
          email: updateNonEssentialAcctDetails.email,
          firstname: updateNonEssentialAcctDetails.firstName,
          lastname: updateNonEssentialAcctDetails.lastName,
          id: expect.any(String),
          isgod: false,
        });
        expect(res.body.fetchnotifications).toBeTruthy();
        expect(res.body.message).toEqual(updatedAccountDetails);
      });

    await app()
      .put('/api/update-account')
      .send(changeAcctPassword)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.user).toEqual('');
        expect(res.body.fetchnotifications).toBeTruthy();
        expect(res.body.message).toEqual(passwordResetSuccess(newSignupEmail));
      });

    // updates email (requires reverification and relogin)
    cookie = await getCookie(newSignupEmail, updatedPassword);
    await app()
      .put('/api/update-account')
      .send(changeAcctEmail)
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual(updatedAccount);
        expect(mailer.send).toHaveBeenCalled();
      });
  });
});

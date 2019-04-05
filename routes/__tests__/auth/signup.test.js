const mailer = require('@sendgrid/mail');
const {
  companyAlreadyExists,
  emailAlreadyTaken,
  missingCredentials,
} = require('../../../shared/authErrors');
const {
  removeNewUser,
  signupNewUser,
} = require('../../__mocks__/auth.mocks.js');

const newSignupEmail = 'signup@test.com';
const newCompany = 'New Signup User';

const signupProps = {
  password: 'password123',
  firstName: 'New',
  lastName: 'Signup',
};

const emailExists = {
  email: 'betatester@subskribble.com', // email from seeds
  company: 'Brand New Company',
  ...signupProps,
};

const companyExists = {
  email: 'test@example.com',
  company: 'Subskribble', // company from seeds
  ...signupProps,
};

describe('Sign Up', () => {
  beforeAll(async (done) => {
    await signupNewUser(newSignupEmail, newCompany, done);
  });

  afterAll(async () => {
    await removeNewUser(newSignupEmail, db);
    jest.clearAllMocks();
  });

  it('handles invalid signup apps', async () => {
    // missing signupProps
    await app()
      .post('/api/signup')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCredentials);
      });

    // email already exists
    await app()
      .post('/api/signup')
      .send(emailExists)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(emailAlreadyTaken);
      });

    // company name already exists
    await app()
      .post('/api/signup')
      .send(companyExists)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(companyAlreadyExists);
      });
  });

  it('handles valid signup apps and sends out an email', () => {
    expect(mailer.send).toHaveBeenCalled();
  });
});

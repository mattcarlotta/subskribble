const request = require('supertest');
const db = require('../../../database/db');
const mailer = require('../../../services/mailer');
const {
  companyAlreadyExists,
  emailAlreadyTaken,
  missingCredentials,
} = require('../../../shared/authErrors');

const signupProps = {
  company: 'Carlotta Corp',
  firstName: 'Matt',
  lastName: 'Carlotta',
  email: 'carlotta.matt@gmail.com',
  password: 'password',
};

const signUp = async () => {
  await request(app)
    .post('/api/signup')
    .send(signupProps)
    .expect(201);
};

describe('Sign Up', () => {
  beforeAll(async () => {
    await signUp();
  });

  afterAll(async () => {
    await db.none('TRUNCATE users RESTART IDENTITY CASCADE');
  });

  it('handles invalid signup requests', async () => {
    // missing signupProps
    await request(app)
      .post('/api/signup')
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(missingCredentials);
      });

    // email already exists
    await request(app)
      .post('/api/signup')
      .send(signupProps)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(emailAlreadyTaken);
      });

    // company name already exists
    await request(app)
      .post('/api/signup')
      .send({ ...signupProps, email: 'test@test.com' })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.err).toEqual(companyAlreadyExists);
      });
  });

  it('handles valid signup requests and sends out an email', () => {
    expect(mailer.send).toHaveBeenCalled();
  });
});

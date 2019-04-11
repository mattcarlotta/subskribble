import app from 'utils/setup';
import db from 'db';
import { thanksForReg } from 'authSuccess';
import { findUserByEmail, verifyEmail } from 'queries';

const signupUser = async (email, company) => {
  await db.task('setup-signup', async (dbtask) => {
    await app()
      .post('/api/signup')
      .send({
        email,
        company,
        password: 'password123',
        firstName: 'Test',
        lastName: 'Signup',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(thanksForReg(email, 'Test', 'Signup'));
      });

    await dbtask.none(verifyEmail, [email]);
  });

  const user = await db.one(findUserByEmail, [email]);
  return user;
};

const signupNewUser = async (email, company, done) => {
  db.task('setup-signup', async (dbtask) => {
    await app()
      .post('/api/signup')
      .send({
        email,
        company,
        password: 'password123',
        firstName: 'Test',
        lastName: 'Signup',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(thanksForReg(email, 'Test', 'Signup'));
      });

    await dbtask.none(verifyEmail, [email]);
    done();
  });
};

const mockRequest = (session, body, query) => ({
  session,
  body,
  query,
});

const mockResponse = () => {
  const res = {};
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export {
  mockRequest, mockResponse, signupUser, signupNewUser,
};
import app from 'utils/setup';
import db from 'db';
import { thanksForReg } from 'authSuccess';
import { verifyEmail } from 'queries';

const signupNewUser = (email, company, done) => {
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

const mockRequest = (session, body) => ({
  session,
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export { mockRequest, mockResponse, signupNewUser };

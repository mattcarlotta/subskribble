/* global app */
import db from 'db';
import { thanksForReg } from 'authSuccess';
import { verifyEmail } from 'queries';

export default (email, company, done) => db.task('setup-signup', async (dbtask) => {
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

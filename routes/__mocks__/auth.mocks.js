/* global app */

const request = require('supertest');
const db = require('../../database/db');
const { thanksForReg } = require('../../shared/authSuccess');
const { verifyEmail } = require('../../database/query');

const removeNewUser = (existingEmail, task) => task.oneOrNone(`DELETE FROM users WHERE email='${existingEmail}'`);

const signupNewUser = (email, company, done) => db.task('setup-signup', async (dbtask) => {
  await removeNewUser(email, db);
  await request(app)
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

module.exports = {
  removeNewUser,
  signupNewUser,
};

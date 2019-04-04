/* global app */

const bcrypt = require('bcrypt');
const request = require('supertest');
const db = require('../../database/db');
const { createNewUser, verifyEmail } = require('../../database/query');
const { currentDate, createRandomToken } = require('../../shared/helpers');

const token = createRandomToken();
const email = 'betatester@subskribble.com';

const seedUser = async () => {
  await db.task('seed-user', async (dbtask) => {
    const newPassword = await bcrypt.hash('password123', 12);
    await dbtask.none(createNewUser, [
      email,
      newPassword,
      'Beta',
      'Tester',
      'Subskribble',
      token,
      `${currentDate()}`,
    ]);

    await dbtask.none(verifyEmail, [email]);
  });
};

const signinProps = {
  email,
  password: 'password123',
};

const signIn = async () => {
  let cookies;
  await request(app)
    .post('/api/signin')
    .send(signinProps)
    .expect(201)
    .then((res) => {
      cookies = res.header['set-cookie'];
    });
  return cookies;
};

module.exports = {
  email,
  token,
  seedUser,
  signIn,
};

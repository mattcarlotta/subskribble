/* global app */

// const bcrypt = require("bcrypt");
const request = require('supertest');
const db = require('../../database/db');
const { thanksForReg } = require('../../shared/authSuccess');
const { verifyEmail } = require('../../database/query');
// const { currentDate, createRandomToken } = require("../../shared/helpers");

// const token = createRandomToken();
// const email = "betatester@subskribble.com";

// const seedUser = async () => {
//   await db.task("seed-user", async dbtask => {
//     const newPassword = await bcrypt.hash("password123", 12);
//     await dbtask.none(createNewUser, [
//       email,
//       newPassword,
//       "Beta",
//       "Tester",
//       "Subskribble",
//       token,
//       `${currentDate()}`
//     ]);
//
//     await dbtask.none(verifyEmail, [email]);
//   });
// };

// const email = "betatester.signup@subskribble.com";
//
// const signinProps = {
//   email,
//   password: "password123"
// };

// const signupProps = {
//   email,
//   password: "password123",
//   company: "Signup Corp",
//   firstName: "Test",
//   lastName: "Signup"
// };

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

// const signIn = async () => {
//   let cookies;
//   await request(app)
//     .post("/api/signin")
//     .send(signinProps)
//     .expect(201)
//     .then(res => {
//       cookies = res.header["set-cookie"];
//     });
//   return cookies;
// };

// const cleanDB = () => db.none("TRUNCATE users RESTART IDENTITY CASCADE");

module.exports = {
  removeNewUser,
  // signinProps,
  signupNewUser,
  // signupProps
  // cleanDB,
  // email,
  // token,
  // seedUser,
  // signIn
};

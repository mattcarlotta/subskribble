const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mailer = require('@sendgrid/mail');
const db = require('../../database/db');
const {
  createNewUser,
  findCompany,
  findUserByEmail,
} = require('../../database/query');
const { createRandomToken, currentDate } = require('../../shared/helpers');
const {
  companyAlreadyExists,
  emailAlreadyTaken,
} = require('../../shared/authErrors');
const newUser = require('../emailTemplates/newUser');
const config = require('../../env');

const env = process.env.NODE_ENV;
const { portal } = config[env];

module.exports = passport.use(
  'local-signup',
  new LocalStrategy(
    {
      // override username with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { firstName, lastName, company } = req.body;
      const token = createRandomToken(); // a token used for email verification

      // check to see if the email is already in use
      try {
        await db.task('local-signup', async (dbtask) => {
          const existingUser = await dbtask.oneOrNone(findUserByEmail, [email]);
          if (existingUser) return done(emailAlreadyTaken, false);

          const existingCompany = await dbtask.oneOrNone(findCompany, [
            company,
          ]);
          if (existingCompany) return done(companyAlreadyExists, false);

          // hash password before attempting to create the user
          const newPassword = await bcrypt.hash(password, 12);
          // create new user
          await dbtask.none(createNewUser, [
            email,
            newPassword,
            firstName,
            lastName,
            company,
            token,
            currentDate,
          ]);

          // creates an email template for a new user signup
          const msg = {
            to: `${email}`,
            from: 'helpdesk@subskribble.com',
            subject: 'Please verify your email address',
            html: newUser(portal, firstName, lastName, token),
          };

          // attempts to send a verification email to newly created user
          await mailer.send(msg);

          return done(null, true);
        });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

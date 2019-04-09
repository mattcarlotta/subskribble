const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const mailer = require('@sendgrid/mail');
const db = require('db');
const { findUserByEmail, resetToken } = require('queries');
const { createRandomToken } = require('helpers');
const { missingEmailCreds } = require('authErrors');
const newToken = require('emailTemplates/newToken');
const config = require('env');

const env = process.env.NODE_ENV;
const { portal } = config[env];

module.exports = passport.use(
  'reset-token',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        await db.task('reset-token', async (dbtask) => {
          // check to see if email exists in the db
          const existingUser = await dbtask.oneOrNone(findUserByEmail, [email]);
          if (!existingUser) return done(missingEmailCreds, false);

          // create a new token for email reset
          const token = createRandomToken();
          await dbtask.none(resetToken, [token, email]);

          // creates an email template for a password reset
          const { firstname, lastname } = existingUser;
          const msg = {
            to: `${email}`,
            from: 'helpdesk@subskribble.com',
            subject: 'Password Reset Confirmation',
            html: newToken(portal, firstname, lastname, token),
          };

          // attempts to send a verification email to newly created user
          await mailer.send(msg);

          return done(null, email);
        });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

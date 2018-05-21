module.exports = app => {
  const { db, query: { findUserByEmail, resetToken } } = app.database;
  const { missingEmailCreds } = app.shared.authErrors;
  const { mailer, emailTemplates: { newToken } } = app.services;
  const { createRandomToken } = app.shared.helpers;
  const apiURL = app.get("apiURL");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");

  passport.use('reset-token', new LocalStrategy({
      usernameField : 'email'
    },
    async (email, password, done) => {
      if (!email) return done(missingEmailCreds, false);

      // check to see if email exists in the db
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (!existingUser) return done(missingEmailCreds, false);

      // create a new token for email reset
      const token = createRandomToken();
      try { await db.none(resetToken(), [token, email]) }
      catch (err) { return done(err, false) }

      // creates an email template for a password reset
      const { firstname, lastname } = existingUser;
      const msg = {
        to: `${email}`,
        from: `helpdesk@subskribble.com`,
        subject: `Password Reset Confirmation`,
        html: newToken(apiURL, firstname, lastname, token)
      }

      // attempts to send a verification email to newly created user
      mailer.send(msg)
        .then(() => (done(null, email)))
        .catch(err => (done(err, false)))
    })
  );
}

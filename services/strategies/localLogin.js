const jwt = require('jwt-simple');

module.exports = app => {
  const { db, query: { findUserByEmail } } = app.database;
  const { authErrors } = app.shared;
  const bcrypt = app.get("bcrypt");
  const cookieKey = app.get("cookieKey");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");

  passport.use('local-login', new LocalStrategy({
    // override username with email
      usernameField : 'email',
      passwordField : 'password',
      // passReqToCallback : true // allows us to send request to the callback
    },
    async (email, password, done) => {
      // check to see if both an email and password were supplied
      if (!email || !password) return done(authErrors.missingCredentials, false);

      // check to see if the user already exists
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (!existingUser) return done(authErrors.badCredentials, false);
      if (!existingUser.verified) return done(authErrors.emailConfirmationReq, false);

      // compare password to existingUser password
      const validPassword = await bcrypt.compare(password, existingUser.password);
      return (!validPassword)
        ? done(authErrors.badCredentials, false)
        : done(null, {
            ...existingUser,
            token:  jwt.encode({ sub: existingUser.id, iat: new Date().getTime()
            }, cookieKey)});
    })
  );
}
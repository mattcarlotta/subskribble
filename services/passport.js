const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;

module.exports = app => {
  const { db, query: { findUserByEmail } } = app.database;

  // serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize the user
  passport.deserializeUser(async (id, done) => {
    const user = await db.oneOrNone(findUserById(), [id])
    done(null, user);
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => {
      // check to see if the user trying to login already exists
      const existingUser = await db.oneOrNone(findUserByEmail(), [email])

      if (!existingUser) return done(null, false, 'There was a problem with your login credentials. That username does not exist in our records.');

      // TODO bcrypt compare password to existingUser id

      // existingUser.comparePassword(password, (err, isMatch) => {
      //   if (err || !isMatch) return done(null, false, 'That username and/or password does not match!');
      //
      //   return done(null, existingUser);
      // });
    })
  );

}

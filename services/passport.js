module.exports = app => {
  const { db, query: { findUserById } } = app.database;
  const passport = app.get("passport");

  // serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize the user from the session
  passport.deserializeUser(async (id, done) => {
    const user = await db.oneOrNone(findUserById(), [id])
    done(null, user);
  });

  require('./strategies/localSignup');
  require('./strategies/localLogin');
  require('./strategies/requireLogin')
  require('./strategies/resetToken');
  require('./strategies/resetPassword');
}

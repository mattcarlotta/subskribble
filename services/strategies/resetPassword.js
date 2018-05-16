module.exports = app => {
  const { db, query: { findUserByToken, updateUserPassword } } = app.database;
  const { authErrors } = app.shared;
  const bcrypt = app.get("bcrypt");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");

  passport.use('reset-password', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { token } = req.query;
      if (!token) return done(authErrors.missingToken, false);

      // check to see if email exists in the db
      const existingUser = await db.oneOrNone(findUserByToken(), [token]);
      if (!existingUser) return done(authErrors.invalidToken, false);

      // compare newpassword to existingUser password
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (validPassword) return done(authErrors.notUniquePassword, false);

      try {
        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12)
        // update user's password
        await db.none(updateUserPassword(),[newPassword, existingUser.id])

        return done(null, existingUser);
      } catch (err) { return done(err, false) }
    })
  );
}

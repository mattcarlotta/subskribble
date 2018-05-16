const JwtStrategy = require('passport-jwt').Strategy;

module.exports = app => {
  const { db, query: { findUserById } } = app.database;
  const { authErrors } = app.shared;
  const passport = app.get("passport");
  const cookieKey = app.get("cookieKey");

  passport.use('require-login', new JwtStrategy({
    jwtFromRequest: req => (req && req.cookies ? req.cookies.Authorization : null), // returns jwt token from req.cookies
    secretOrKey: cookieKey,
  },
    async (payload, done) => {
      // make sure jwt token was valid
      if (!payload || !payload.sub) return done(authErrors.invalidToken, false);

      // see if the jwt payload id matches any user record
      const existingUser = await db.oneOrNone(findUserById(), [payload.sub]);
      if (!existingUser) return done(authErrors.badCredentials, false);
      return (!existingUser.verified) ? done(authErrors.emailConfirmationReq, false) : done(null, existingUser)
    })
  )
}

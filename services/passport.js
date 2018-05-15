const bcrypt            = require('bcrypt');
const jwt               = require('jwt-simple');
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const JwtStrategy       = require('passport-jwt').Strategy;
const LocalStrategy     = require('passport-local').Strategy;

module.exports = app => {
  const {
    db,
    query: {
      createNewUser,
      findUserByEmail,
      findUserById,
      findUserByToken,
      updateUserPassword,
      resetToken
    }
  } = app.database;
  const { authErrors } = app.shared;
  const { mailer, emailTemplates: { newToken, newUser } } = app.services;
  const { createRandomToken } = app.shared.helpers;
  const apiURL = app.get("apiURL");
  const cookieKey = app.get("cookieKey");
  const passport = app.get("passport");

  // serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize the user from the session
  passport.deserializeUser(async (id, done) => {
    const user = await db.oneOrNone(findUserById(), [id])
    done(null, user);
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================

  passport.use('local-signup', new LocalStrategy({
      // override username with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { firstName, lastName } = req.body;
      const token = createRandomToken(); // a token used for email verification

      // check to see if both an email and password were supplied
      if (!email || !password || !firstName || !lastName) return done(authErrors.missingCredentials, false);

      // check to see if the email is already in use
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (existingUser) return done(authErrors.emailAlreadyTaken, false);

      // attempt to create new user
      try {
        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12)
        // create new user
        await db.none(createNewUser(),[email, newPassword, firstName, lastName, token])
      } catch (err) { return done(err, false) }

      // creates an email template for a new user signup
      const msg = {
        to: `${email}`,
        from: `helpdesk@subskribble.com`,
        subject: `Please verify your email address`,
        html: newUser(apiURL, firstName, lastName, token)
      }

      // attempts to send a verification email to newly created user
      mailer.send(msg)
        .then(() => (done(null, true)))
        .catch(err => (done(err, false)))
    })
  )


  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

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
      if (!validPassword) return done(authErrors.badCredentials, false);

      // set existingUser and a token to req
      const loggedinUser = { ...existingUser, token:  jwt.encode({ sub: existingUser.id, iat: new Date().getTime()}, cookieKey)};
      return done(null, loggedinUser);
    })
  );


  // =========================================================================
  // AUTH'D ROUTES / REFRESHES ===============================================
  // =========================================================================

  passport.use('require-login', new JwtStrategy({
		jwtFromRequest: req => (req && req.cookies ? req.cookies.Authorization : null), // returns jwt token from req.cookies
		secretOrKey: cookieKey,
    passReqToCallback: true
	},
    async (req, payload, done) => {
      // make sure jwt token was valid
		  if (!payload || !payload.sub) return done(null, false);

      // see if the jwt payload id matches any user record
      const existingUser = await db.oneOrNone(findUserById(), [payload.sub]);
      if (!existingUser) return done(authErrors.badCredentials, false);
      if (!existingUser.verified) return done(authErrors.emailConfirmationReq, false);

      return done(null, existingUser);
	 })
  )

  // =========================================================================
  // RESET TOKEN =============================================================
  // =========================================================================

  passport.use('reset-token', new LocalStrategy({
      usernameField : 'email'
    },
    async (email, password, done) => {
      if (!email) return done(authErrors.missingEmailCreds, false);

      // check to see if email exists in the db
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (!existingUser) return done(authErrors.missingEmailCreds, false);

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

  // =========================================================================
  // RESET PASSWORD ==========================================================
  // =========================================================================
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

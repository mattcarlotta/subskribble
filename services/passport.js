const bcrypt          = require('bcrypt');
const cookieParser    = require('cookie-parser');
const jwt             = require('jwt-simple');
const mailerTemplate  = require('./mailer');
const passport        = require('passport');
const ExtractJwt      = require('passport-jwt').ExtractJwt;
const JwtStrategy     = require('passport-jwt').Strategy;
const LocalStrategy   = require('passport-local').Strategy;
const sgMail          = require('@sendgrid/mail');
const randomToken     = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

module.exports = app => {
  const { db, query: { createNewUser, findUserByEmail, findUserById } } = app.database;
  const apiURL = app.get("apiURL");
  const cookieKey = app.get("cookieKey");
  const sendgridAPIKey = app.get("sendgridAPIKey");

  // error messages
  const badCredentials = 'There was a problem with your login credentials. Please make sure your username and password are correct.';
  const missingCredentials = 'You must supply a valid first name, last name, email and password in order to sign up.';
  const emailAlreadyTaken = 'That email is already in use and is associated with an active account.';
  const emailConfirmationReq = 'You must verify your email before attempting to do that.';

  // sets sendgrid API key
  sgMail.setApiKey(sendgridAPIKey);

  // serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize the user from the session
  passport.deserializeUser(async (id, done) => {
    const user = await db.oneOrNone(findUserById(), [id])
    done(null, user);
  });

  // =========================================================================
  // LOCAL SIGNUP =============================================================
  // =========================================================================

  passport.use('local-signup', new LocalStrategy({
      // override username with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { firstName, lastName } = req.body;
      const token = randomToken(32); // a token used for email verification

      // check to see if both an email and password were supplied
      if (!email || !password || !firstName || !lastName) return done(missingCredentials, false);

      // check to see if the email is already in use
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (existingUser) return done(emailAlreadyTaken, false);

      // attempt to create new user
      try {
        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12)
        // create new user
        await db.none(createNewUser(),[email, newPassword, firstName, lastName, token])
      } catch (err) { return done(err, false) }

      // creates an email template
      const msg = {
        to: `${email}`,
        from: `helpdesk@subskribble.com`,
        subject: `Please verify your email address`,
        html: mailerTemplate(apiURL, firstName, lastName, token)
      }

      // attempts to send a verification email to newly created user
      sgMail.send(msg)
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
      if (!email || !password) return done(missingCredentials, false);

      // check to see if the user already exists
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (!existingUser) return done(badCredentials, false);
      if (!existingUser.verified) return done(emailConfirmationReq, false);

      // compare password to existingUser password
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) return done(badCredentials, false);

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
      if (!existingUser) return done(badCredentials, false);
      if (!existingUser.verified) return done(emailConfirmationReq, false);

      return done(null, existingUser);
	 })
  )
}

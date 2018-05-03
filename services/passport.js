const bcrypt          = require('bcrypt');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;

module.exports = app => {
  const { db, query: { createNewUser, findUserByEmail, findUserById } } = app.database;

  // serialize the user for the session
  passport.serializeUser((user, done) => done(null, user.id));

  // deserialize the user
  passport.deserializeUser(async (id, done) => {
    const user = await db.oneOrNone(findUserById(), [id])
    done(null, user);
  });

  // =========================================================================
  // LOCAL SIGNUP =============================================================
  // =========================================================================

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    async (req, email, password, done) => {
      const { firstName, lastName } = req.body;

      // check see if both an email and password were supplied
      if (!email || !password) {
        req.error = 'You must supply a valid email and a password in order to sign up!';
        return done(null, false)
      }

      // check and see if the email is already in use
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);

      if (existingUser) {
        req.error = 'That email is already in use and is associated with an active account.'
        return done(null, false);
      }

      // hash password before saving
      const newPassword = await bcrypt.hash(password, 12)

      // save new user
      try {
        await db.none(createNewUser(),[email, newPassword, firstName, lastName])
        return done(null, true);
      } catch (err) {
        req.error = err;
        return done(err, false)
      }
    })
  )


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
      // check to see if the user already exists
      const existingUser = await db.oneOrNone(findUserByEmail(), [email])
      if (!existingUser) return done(null, false, 'There was a problem with your login credentials. That username does not exist in our records.');

      // compare password to existingUser password
      const validPassword = bcrypt.compare(password, existingUser.password);
      return (!validPassword) ? done(null, false) : done(null, existingUser);
    })
  );

}

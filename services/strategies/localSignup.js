module.exports = app => {
  const { db, query: { createNewUser, findCompany, findUserByEmail } } = app.database;
  const { mailer, emailTemplates: { newUser } } = app.services;
  const { companyAlreadyExists, emailAlreadyTaken, missingCredentials } = app.shared.authErrors;
  const { createRandomToken } = app.shared.helpers;
  const portal = app.get("portal");
  const bcrypt = app.get("bcrypt");
  const LocalStrategy = app.get("LocalStrategy");
  const passport = app.get("passport");

  passport.use('local-signup', new LocalStrategy({
      // override username with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      const { firstName, lastName, company } = req.body;
      const token = createRandomToken(); // a token used for email verification

      // check to see if both an email and password were supplied
      if (!email || !password || !firstName || !lastName || !company) return done(missingCredentials, false);

      // check to see if the email is already in use
      const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
      if (existingUser) return done(emailAlreadyTaken, false);

      const existingCompany = await db.oneOrNone(findCompany(), [company]);
      if (existingCompany) return done(companyAlreadyExists, false);

      // attempt to create new user
      try {
        // hash password before attempting to create the user
        const newPassword = await bcrypt.hash(password, 12)
        // create new user
        await db.none(createNewUser(),[email, newPassword, firstName, lastName, company, token])
      } catch (err) { return done(err, false) }

      // creates an email template for a new user signup
      const msg = {
        to: `${email}`,
        from: `helpdesk@subskribble.com`,
        subject: `Please verify your email address`,
        html: newUser(portal, firstName, lastName, token)
      }

      // attempts to send a verification email to newly created user
      mailer.send(msg)
        .then(() => (done(null, true)))
        .catch(err => (done(err, false)))
    })
  )
}

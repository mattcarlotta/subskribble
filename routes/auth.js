module.exports = app => {
  const { db, query: { findUserByEmail, findUserByToken, verifyEmail } } = app.database;
  const { sendError } = app.shared.helpers;

  const passport = app.get("passport");

  app.post('/api/signup', (req, res, next) => passport.authenticate('local-signup', err => {
    if (err) return sendError(err, res, next);
    const { firstName, lastName, email } = req.body

    res.status(201).json({ message: `Thank you for registering, ${firstName} ${lastName}. Please check ${email} for a verification link.` })
  })(req, res, next));

  app.post('/api/signin', (req, res, next) => passport.authenticate('local-login', (err, user) => {
    if (err) return sendError(err, res, next);

    res.status(201).json({ ...user });
  })(req, res, next));

  app.get('/api/loggedin', (req, res, next) => passport.authenticate('require-login', (err, user) => {
    if (!user) return next();
    if (err) return sendError(err, res, next);

    res.status(201).json({ ...user })
  })(req, res, next));

  app.put(`/api/email/verify?`, async (req, res, next) => {
    const { token } = req.query;
    if (!token) return sendError('Missing token. Please check your email and click the "Verify Email" button or the link below it.', res, next);

    try {
      const existingUser = await db.oneOrNone(findUserByToken(), [token]);
      if (!existingUser) return sendError('Invalid token! Please check your email and click the "Verify Email" or the linke below it again.', res, next)
      if (existingUser.verified) return res.status(201).json({ email: existingUser.email });

      await db.none(verifyEmail(), [existingUser.id]);

      res.status(201).json({ email: existingUser.email })
    } catch (err) {return sendError(err, res, next) }
  })

  app.put('/api/reset-token', (req, res, next) => passport.authenticate('reset-token', (err, email) => {
    if (err) return sendError(err, res, next);
    if (!email) return sendError('No user found!', res, next);

    res.status(201).json({ message: `Password reset confirmed. Please check ${email} for a reset link.` })
  })(req, res, next));

  /*
  app.put('/api/reset-token', async (req, res, next) => {
    const { email } = req.body;
    console.log('req.body', req.body);

    if (!email) return sendError('Missing email', res, next);

    //check to see if email exists in the db
    const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
    if (!existingUser) return sendError('No User Found', res, next);

    //  create a new token for email reset
    // const token = randomToken(32);
    // try {
    //   // create new user token
    //   await db.none(resetToken(), [token, email])
    // } catch (err) { return sendError(err, res, next) }

      // creates an email template
      // const msg = {
      //   to: `${email}`,
      //   from: `helpdesk@subskribble.com`,
      //   subject: `Password Reset Confirmation`,
      //   html: newTokenTemplate(email, token)
      // }

      // attempts to send a verification email to newly created user
    //   sgMail.send(msg)
    //     .then(() => (done(null, email)))
    //     .catch(err => (done(err, false)))
    // console.log(req.body);
    // console.log('triggered callback', err, user);
    sendError('Route not created yet', res, next)
    // res.status(201).json({ message: `Password reset confirmed. Please check ${user.email} for a reset link.` })
  });
  */
  // app.put('/api/reset-password', (req, res, next) => passport.authenticate('reset-password', (err, user) => {
  //   if (!user) return next();
  //   if (err) return sendError(err, res, next);
  //
  //   res.status(201).json({ message: `Password reset confirmed. Please check ${user.email} for a reset link.` })
  // })(req, res, next));

}

/*
app.put('/api/reset-token', async (req, res, next) => {
  const { email } = req.body;

  if (!email) return done(missingEmailCreds, false);

  //check to see if email exists in the db
  const existingUser = await db.oneOrNone(findUserByEmail(), [email]);
  if (!existingUser) return done(missingEmailCreds, false);

  //  create a new token for email reset
  const token = randomToken(32);
  try {
    // create new user token
    await db.none(resetToken(), [token, email])
  } catch (err) { return done(err, false) }

    // creates an email template
    // const msg = {
    //   to: `${email}`,
    //   from: `helpdesk@subskribble.com`,
    //   subject: `Password Reset Confirmation`,
    //   html: newTokenTemplate(email, token)
    // }

    // attempts to send a verification email to newly created user
  //   sgMail.send(msg)
  //     .then(() => (done(null, email)))
  //     .catch(err => (done(err, false)))
  // console.log(req.body);
  // console.log('triggered callback', err, user);
  sendError('Route not created yet', res, next)
  // res.status(201).json({ message: `Password reset confirmed. Please check ${user.email} for a reset link.` })
});
*/

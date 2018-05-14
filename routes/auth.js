module.exports = app => {
  const { db, query: { findUserByToken, removeToken, verifyEmail } } = app.database;
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

  // app.put('/api/reset-password', reset);

}

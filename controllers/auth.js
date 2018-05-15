module.exports = app => {
  const { db, query: { findUserByToken, verifyEmail } } = app.database;
  const { sendError } = app.shared.helpers;

  // creates a new user
  const _create = (err, req, res, next) => {
    if (err) return sendError(err, res, next);

    const { firstName, lastName, email } = req.body
    res.status(201).json({ message: `Thank you for registering, ${firstName} ${lastName}. Please check ${email} for a verification link.` })
  }

  // allows a user to sign in
  const _login = (err, user, res, next) => {
    if (err) return sendError(err, res, next);
    if (!user) return next();

    res.status(201).json({ ...user });
  }

  // allows a user to update their password
  const _resetPassword = (err, user, res, next) => {
    if (err) return sendError(err, res, next);
    if (!user) return sendError('No user found!', res, next)

    res.status(201).json({message: `Password has been reset for ${user.email}. Please login into your account again.`})
  }

  // emails a user a token to reset their password
  const _resetToken = (err, email, res, next) => {
    if (err) return sendError(err, res, next);
    if (!email) return sendError('No user found!', res, next);

    res.status(201).json({ message: `Password reset confirmed. Please check ${email} for a reset link.` })
  }

  // verifies the user has a valid email address before be able to log in
  const _verifyEmail = async (req, res, next) => {
    const { token } = req.query;
    if (!token) return sendError('Missing token. Please check your email and click the "Verify Email" button or the link below it.', res, next);

    try {
      // check if token is valid
      const existingUser = await db.oneOrNone(findUserByToken(), [token]);
      if (!existingUser) return sendError('Invalid token! Please check your email and click the "Verify Email" or the linke below it again.', res, next)
      if (existingUser.verified) return res.status(201).json({ email: existingUser.email });

      // sets user to verification status to true
      await db.none(verifyEmail(), [existingUser.email]);

      res.status(201).json({ email: existingUser.email })
    } catch (err) {return sendError(err, res, next) }
  }

  return {
    create: (err, req, res, next) => _create(err, req, res, next),
    login: (err, user, res, next) => _login(err, user, res, next),
    resetPassword: (err, user, res, next) => _resetPassword(err, user, res, next),
    resetToken: (err, email, res, next) => _resetToken(err, email, res, next),
    verifyEmail: (req, res, next) => _verifyEmail(req, res, next)
  }
}

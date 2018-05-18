module.exports = app => {
  const { db, query: { findUserByToken, verifyEmail } } = app.database;
  const { sendError } = app.shared.helpers;
  const { badCredentials } = app.shared.authErrors;
  const passport = app.get("passport");

  return {
    // CREATES A NEW USER
    create: (req, res, next) => passport.authenticate('local-signup', err => {
      if (err) return sendError(err, res, next);

      const { firstName, lastName, email } = req.body
      res.status(201).json({ message: `Thank you for registering, ${firstName} ${lastName}. Please check ${email} for a verification link.` })
    })(req, res, next),
    // ALLOWS A USER TO LOG INTO THE APP
    login: (req, res, next) => passport.authenticate('local-login', err => {
      if (err) return sendError(err, res, next);
      if (!req.session) return sendError(badCredentials, res, next);

      res.status(201).json({ ...req.session });
    })(req, res, next),
    // ALLOWS A USER TO LOG INTO THE APP
    loggedin: (req, res) => res.status(201).json({ ...req.session }),
    // REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
    logout: (req, res, next) => {
      if (!req.session.id) return sendError('Already logged out', res, next);
      req.session = null;
      res.clearCookie('Authorization', { path: '/'}).status(200).send('Cookie deleted.');
    },
    // ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
    resetPassword: (req, res, next) => passport.authenticate('reset-password', (err, user) => {
      if (err) return sendError(err, res, next);
      if (!user) return sendError('No user found!', res, next)

      res.status(201).json({message: `Password has been reset for ${user.email}. Please login into your account again.`})
    })(req, res, next),
    // EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
    resetToken: (req, res, next) => passport.authenticate('reset-token', (err, email) => {
      if (err) return sendError(err, res, next);
      if (!email) return sendError('No user found!', res, next);

      res.status(201).json({ message: `Password reset confirmed. Please check ${email} for a reset link.` })
    })(req, res, next),
    // VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
    verifyEmail: async (req, res, next) => {
      const { token } = req.query;
      if (!token) return sendError('Missing token. Please check your email and click the "Verify Email" button or the link below it.', res, next);

      try {
        const existingUser = await db.oneOrNone(findUserByToken(), [token]); // check if token is valid
        if (!existingUser) return sendError('Invalid token! Please check your email and click the "Verify Email" or the link below it again.', res, next)
        if (existingUser.verified) return res.status(201).json({ email: existingUser.email });

        await db.none(verifyEmail(), [existingUser.email]); // sets user to verification status to true

        res.status(201).json({ email: existingUser.email })
      } catch (err) {return sendError(err, res, next) }
    }
  }
}

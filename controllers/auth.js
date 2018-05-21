module.exports = app => {
  const { db, query: { findUserByToken, verifyEmail } } = app.database;
  const { sendError } = app.shared.helpers;
  const { badCredentials, invalidToken, missingToken } = app.shared.authErrors;
  const { passwordReset, passwordResetSuccess, passwordResetToken, thanksForReg } = app.shared.authSuccess;
  const passport = app.get("passport");

  return {
    // CREATES A NEW USER
    create: (req, res, next) => passport.authenticate('local-signup', err => {
      if (err) return sendError(err, res, next);

      res.status(201).json(thanksForReg(req.body.email, req.body.firstName, req.body.lastName))
    })(req, res, next),

    // ALLOWS A USER TO LOG INTO THE APP
    login: (req, res, next) => passport.authenticate('local-login', err => {
      if (err || !req.session) return sendError(err || badCredentials, res, next);

      res.status(201).json({ ...req.session });
    })(req, res, next),

    // ALLOWS A USER TO LOG INTO THE APP
    loggedin: (req, res) => res.status(201).json({ ...req.session }),

    // REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
    logout: (req, res, next) => {
      if (!req.session.id) return sendError('Already logged out', res, next);
      req.session = null;

      res.clearCookie('Authorization', { path: '/' }).status(200).send('Cookie deleted.');
    },

    // ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
    resetPassword: (req, res, next) => passport.authenticate('reset-password', (err, user) => {
      if (err || !user) return sendError(err || 'No user found!', res, next);

      res.status(201).json(passwordResetSuccess(email))
    })(req, res, next),

    // EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
    resetToken: (req, res, next) => passport.authenticate('reset-token', (err, email) => {
      if (err || !email) return sendError(err || 'No user found!', res, next);

      res.status(201).json(passwordResetToken(email))
    })(req, res, next),

    // VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
    verifyEmail: async (req, res, next) => {
      const { token } = req.query;
      if (!token) return sendError(missingToken, res, next);

      try {
        const existingUser = await db.oneOrNone(findUserByToken(), [token]); // check if token is valid
        if (!existingUser) return sendError(invalidToken, res, next)
        if (existingUser.verified) return res.status(201).json({ email: existingUser.email });

        await db.none(verifyEmail(), [existingUser.email]); // sets user to verification status to true

        res.status(201).json({ email: existingUser.email })
      } catch (err) { return sendError(err, res, next) }
    }
  }
}

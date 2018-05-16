module.exports = app => {
  const { db, query: { findUserByToken, verifyEmail } } = app.database;
  const { sendError } = app.shared.helpers;

  return {
    // CREATES A NEW USER
    create: (err, req, res, next) => {
      if (err) return sendError(err, res, next);

      const { firstName, lastName, email } = req.body
      res.status(201).json({ message: `Thank you for registering, ${firstName} ${lastName}. Please check ${email} for a verification link.` })
    },
    // ALLOWS A USER TO LOG INTO THE APP
    login: (err, user, res, next) => {
      if (err) return sendError(err, res, next);
      if (!user) return next();

      res.status(201).json({ ...user });
    },
    // ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
    resetPassword: (err, user, res, next) => {
      if (err) return sendError(err, res, next);
      if (!user) return sendError('No user found!', res, next)

      res.status(201).json({message: `Password has been reset for ${user.email}. Please login into your account again.`})
    },
    // EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
    resetToken: (err, email, res, next) => {
      if (err) return sendError(err, res, next);
      if (!email) return sendError('No user found!', res, next);

      res.status(201).json({ message: `Password reset confirmed. Please check ${email} for a reset link.` })
    },
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

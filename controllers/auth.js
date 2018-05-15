module.exports = app => {
  const { db, query: { findUserByToken, verifyEmail } } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  const _create = (req, res) => {
    const { firstName, lastName, email } = req.body
    res.status(201).json({ message: `Thank you for registering, ${firstName} ${lastName}. Please check ${email} for a verification link.` })
  }

  const _login = (user, res) => res.status(201).json({ ...user });

  const _resetPassword = (user, res) => res.status(201).json({
    message: `Password has been reset for ${user.email}. Please login into your account again.`
  })

  const _resetToken = (email, res) => res.status(201).json({ message: `Password reset confirmed. Please check ${email} for a reset link.` })

  const _verifyEmail = async (req, res) => {
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
    create: (req, res) => _create(req, res),
    login: (user,res) => _login(user,res),
    resetPassword: (user,res) => _resetPassword(user,res),
    resetToken: (email,res) => _resetToken(email,res),
    verifyEmail: (req, res) => _verifyEmail(req, res)
  }
}

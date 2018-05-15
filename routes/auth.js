module.exports = app => {
  const { auth: { create, login, resetPassword, resetToken, verifyEmail } } = app.controllers;
  const { sendError } = app.shared.helpers;
  const passport = app.get("passport");

  app.post('/api/signup', (req, res, next) => passport.authenticate('local-signup', err => {
    if (err) return sendError(err, res, next);

    create(req, res);
  })(req, res, next));

  app.post('/api/signin', (req, res, next) => passport.authenticate('local-login', (err, user) => {
    if (err) return sendError(err, res, next);

    login(user, res);
  })(req, res, next));

  app.get('/api/loggedin', (req, res, next) => passport.authenticate('require-login', (err, user) => {
    if (!user) return next();
    if (err) return sendError(err, res, next);

    login(user, res);
  })(req, res, next));

  app.put(`/api/email/verify?`, verifyEmail);


  app.put('/api/reset-password/verify?', (req, res, next) => passport.authenticate('reset-password', (err, user) => {
    if (err) return sendError(err, res, next);
    if (!user) return sendError('No user found!', res, next)

    resetPassword(user,res);
  })(req, res, next));


  app.put('/api/reset-token', (req, res, next) => passport.authenticate('reset-token', (err, email) => {
    if (err) return sendError(err, res, next);
    if (!email) return sendError('No user found!', res, next);

    resetToken(email,res)
  })(req, res, next));

}

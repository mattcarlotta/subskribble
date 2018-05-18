module.exports = app => {
  const { auth: { create, login, loggedin, logout, resetPassword, resetToken, verifyEmail } } = app.controllers;
  const passport = app.get("passport");
  const { requireRelogin } = app.services.strategies;

  app.post('/api/signup', (req, res, next) => passport.authenticate('local-signup', err => create(err, req, res, next))(req, res, next));

  app.post('/api/signin', (req, res, next) => passport.authenticate('local-login', err => login(err, req, res, next))(req, res, next));
  // app.post('/api/signin', (req, res, next) => passport.authenticate('local-login', (err, user) => login(err, user, res, next))(req, res, next));

  app.get('/api/loggedin', requireRelogin, loggedin);

  app.post('/api/logout', logout);
  // app.get('/api/loggedin', (req, res, next) => passport.authenticate('require-login', (err, user) => login(err, user, res, next))(req, res, next));

  app.put(`/api/email/verify?`, verifyEmail);

  app.put('/api/reset-password/verify?', (req, res, next) => passport.authenticate('reset-password', (err, user) => resetPassword(err, user, res, next))(req, res, next));

  app.put('/api/reset-token', (req, res, next) => passport.authenticate('reset-token', (err, email) => resetToken(err, email, res, next))(req, res, next));
}

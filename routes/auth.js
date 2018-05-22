module.exports = app => {
  const { auth: { create, login, loggedin, logout, resetPassword, resetToken, verifyEmail } } = app.controllers;
  const { requireRelogin } = app.services.strategies;

  app.post('/api/signup', create);
  app.post('/api/signin', login);
  app.get('/api/loggedin', requireRelogin, loggedin);
  app.post('/api/logout', logout);
  app.put('/api/reset-password/verify?', resetPassword);
  app.put('/api/reset-token', resetToken);
  app.put(`/api/email/verify?`, verifyEmail);
}

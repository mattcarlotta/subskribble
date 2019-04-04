const {
  create,
  deleteAccount,
  login,
  loggedin,
  logout,
  resetPassword,
  resetToken,
  saveSidebarState,
  updateAccount,
  verifyEmail,
} = require('../controllers/auth');
const requireRelogin = require('../services/strategies/requireRelogin');
const requireAuth = require('../services/strategies/requireAuth');

module.exports = (app) => {
  app.post('/api/signup', create);
  app.post('/api/signin', login);
  app.get('/api/loggedin', requireRelogin, loggedin);
  app.post('/api/logout', logout);
  app.put('/api/reset-password/verify?', resetPassword);
  app.put('/api/reset-token', resetToken);
  app.put('/api/save-sidebar-state?', requireAuth, saveSidebarState);
  app.put('/api/update-account', requireAuth, updateAccount);
  app.put('/api/email/verify?', verifyEmail);
  app.delete('/api/delete-account', requireAuth, deleteAccount);
};

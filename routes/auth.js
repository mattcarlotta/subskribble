import {
  create,
  deleteAccount,
  login,
  loggedin,
  logout,
  resetPassword,
  resetToken,
  saveSidebarState,
  updateAccount,
  verifyAccount,
} from 'controllers/auth';
import { requireRelogin, requireAuth } from 'strategies';

export default (app) => {
  app.post('/api/signup', create);
  app.post('/api/signin', login);
  app.get('/api/loggedin', requireRelogin, loggedin);
  app.post('/api/logout', logout);
  app.put('/api/reset-password/verify?', resetPassword);
  app.put('/api/reset-token', resetToken);
  app.put('/api/save-sidebar-state?', requireAuth, saveSidebarState);
  app.put('/api/update-account', requireAuth, updateAccount);
  app.put('/api/email/verify?', verifyAccount);
  app.delete('/api/delete-account', requireAuth, deleteAccount);
};

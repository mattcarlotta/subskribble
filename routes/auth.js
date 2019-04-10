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
// const requireRelogin = require('strategies/requireRelogin');
// const requireAuth = require('strategies/requireAuth');
import { requireRelogin, requireAuth } from 'strategies';
// import requireAuth from "strategies/requireAuth";
// import requireRelogin from "strategies/requireRelogin";

// const authRoutes =

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

// export default app => {
//   app.post("/api/signup", create);
//   app.post("/api/signin", login);
//   app.get("/api/loggedin", requireRelogin, loggedin);
//   app.post("/api/logout", logout);
//   app.put("/api/reset-password/verify?", resetPassword);
//   app.put("/api/reset-token", resetToken);
//   app.put("/api/save-sidebar-state?", requireAuth, saveSidebarState);
//   app.put("/api/update-account", requireAuth, updateAccount);
//   app.put("/api/email/verify?", verifyEmail);
//   app.delete("/api/delete-account", requireAuth, deleteAccount);
// };

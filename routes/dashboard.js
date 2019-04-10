import getAll from 'controllers/dashboard';
import { requireAuth } from 'strategies';

module.exports = (app) => {
  app.get('/api/dashboard', requireAuth, getAll);
};

import getAll from 'controllers/dashboard';
import { requireAuth } from 'strategies';

export default (app) => {
  app.get('/api/dashboard', requireAuth, getAll);
};

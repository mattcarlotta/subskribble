const { getAll } = require('../controllers/dashboard');
const requireAuth = require('../services/strategies/requireAuth');

module.exports = (app) => {
  app.get('/api/dashboard', requireAuth, getAll);
};

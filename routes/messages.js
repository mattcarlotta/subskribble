const {
  create,
  index,
  deleteOne,
  fetchCounts,
  fetchRecords,
} = require('../controllers/messages');
const requireAuth = require('../services/strategies/requireAuth');

module.exports = (app) => {
  app.post('/api/messages/create', requireAuth, create);
  app.get('/api/messages', requireAuth, index);
  app.get('/api/messagecounts', requireAuth, fetchCounts);
  app.get('/api/messages/records', requireAuth, fetchRecords);
  app.delete('/api/messages/delete/:id', requireAuth, deleteOne);
};

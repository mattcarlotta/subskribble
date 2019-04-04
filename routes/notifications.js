const {
  index,
  deleteAll,
  deleteOne,
  updateAll,
} = require('../controllers/notifications');
const requireAuth = require('../services/strategies/requireAuth');

module.exports = (app) => {
  app.delete('/api/notifications/deleteall', requireAuth, deleteAll);
  app.delete('/api/notification/delete?', requireAuth, deleteOne);
  app.get('/api/notifications', requireAuth, index);
  app.put('/api/notification/markasread', requireAuth, updateAll);
};

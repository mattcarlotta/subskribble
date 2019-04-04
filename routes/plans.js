const {
  create,
  deleteOne,
  fetchAllActiveRecords,
  fetchCounts,
  fetchRecords,
  index,
  updateOne,
  updateStatus,
  selectOne,
} = require('../controllers/plans');
const requireAuth = require('../services/strategies/requireAuth');

module.exports = (app) => {
  app.post('/api/plans/create', requireAuth, create);
  app.get('/api/plans/plan?', requireAuth, selectOne);
  app.delete('/api/plans/delete/:id', requireAuth, deleteOne);
  app.get('/api/plancounts', requireAuth, fetchCounts);
  app.get('/api/plans/only-active', requireAuth, fetchAllActiveRecords);
  app.get('/api/plans/records', requireAuth, fetchRecords);
  app.get('/api/plans', requireAuth, index);
  app.put('/api/plans/edit/:id', requireAuth, updateOne);
  app.put('/api/plans/update/:id', requireAuth, updateStatus);
};

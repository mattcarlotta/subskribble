const {
  index,
  deleteOne,
  fetchCounts,
  fetchOne,
  fetchRecords,
  refundOne,
} = require('controllers/transactions');
const requireAuth = require('strategies/requireAuth');

module.exports = (app) => {
  app.delete('/api/transactions/delete/:id', requireAuth, deleteOne);
  app.get('/api/transaction/record?', requireAuth, fetchOne);
  app.get('/api/transactioncounts', requireAuth, fetchCounts);
  app.get('/api/transactions/records', requireAuth, fetchRecords);
  app.post('/api/transaction/refund', requireAuth, refundOne);
  app.get('/api/transactions', requireAuth, index);
};

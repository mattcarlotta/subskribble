module.exports = app => {
  const { transactions: { index, deleteOne, fetchCounts, fetchRecords } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.delete('/api/transactions/delete/:id', requireAuth, deleteOne)
  app.get('/api/transactioncounts', requireAuth, fetchCounts)
  app.get('/api/transactions/records', requireAuth, fetchRecords)
  app.get('/api/transactions', requireAuth, index)
}

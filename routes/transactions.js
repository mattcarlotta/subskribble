module.exports = app => {
  const { transactions: { index, deleteOne, fetchCounts, fetchRecords } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.delete('/api/transactions/delete/:id', requireAuth, deleteOne)
  app.get('/api/transactioncounts', requireAuth, fetchCounts)
  app.get('/api/transactions/records', requireAuth, fetchRecords)
  app.get('/api/transactions', requireAuth, index)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
}

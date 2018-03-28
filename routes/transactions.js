module.exports = app => {
  const { transactions } = app.controllers;

  app.get('/api/transactions', transactions.index)
  app.get('/api/transactioncounts', transactions.fetchCounts)
  app.get('/api/transactions/records', transactions.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.delete('/api/transactions/delete/:id', transactions.delete)
}

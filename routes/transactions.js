module.exports = app => {
  const { transactions: {index, deleteOne, fetchCounts, fetchRecords} } = app.controllers;

  app.get('/api/transactions', index)
  app.get('/api/transactioncounts', fetchCounts)
  app.get('/api/transactions/records', fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.delete('/api/transactions/delete/:id', deleteOne)
}

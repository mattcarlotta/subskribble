module.exports = app => {
  const { plans: { index, deleteOne, fetchCounts, fetchRecords, updateOne } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.delete('/api/plans/delete/:id', requireAuth, deleteOne)
  app.get('/api/plancounts', requireAuth, fetchCounts)
  app.get('/api/plans/records', requireAuth, fetchRecords)
  app.get('/api/plans', requireAuth, index)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/plans/update/:id', requireAuth, updateOne)
}

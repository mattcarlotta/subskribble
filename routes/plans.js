module.exports = app => {
  const { plans: { create, deleteOne, fetchAllActiveRecords, fetchCounts, fetchRecords, index, updateOne } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.post('/api/plans/create', requireAuth, create)
  app.delete('/api/plans/delete/:id', requireAuth, deleteOne)
  app.get('/api/plancounts', requireAuth, fetchCounts)
  app.get('/api/plans/only-active', requireAuth, fetchAllActiveRecords)
  app.get('/api/plans/records', requireAuth, fetchRecords)
  app.get('/api/plans', requireAuth, index)
  app.put('/api/plans/update/:id', requireAuth, updateOne)
}

module.exports = app => {
  const { plans: { index, deleteOne, fetchCounts, fetchRecords, updateOne } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.delete('/api/plans/delete/:id', requireAuth, deleteOne)
  app.get('/api/plancounts', requireAuth, fetchCounts)
  app.get('/api/plans/records', requireAuth, fetchRecords)
  app.get('/api/plans', requireAuth, index)
  app.put('/api/plans/update/:id', requireAuth, updateOne)
}

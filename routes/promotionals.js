module.exports = app => {
  const { promotionals: { index, deleteOne, fetchCounts, fetchRecords, updateOne } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.delete('/api/promotionals/delete/:id', requireAuth, deleteOne)
  app.get('/api/promotionalcounts', requireAuth, fetchCounts)
  app.get('/api/promotionals/records', requireAuth, fetchRecords)
  app.get('/api/promotionals', requireAuth, index)
  app.put('/api/promotionals/update/:id', requireAuth, updateOne)
}

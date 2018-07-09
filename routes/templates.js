module.exports = app => {
  const { templates: { create, index, deleteOne, fetchCounts, fetchRecords, updateOne } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.post('/api/templates/create', requireAuth, create)
  app.get('/api/templates', requireAuth, index)
  app.get('/api/templatecounts', requireAuth, fetchCounts)
  app.get('/api/templates/records', requireAuth, fetchRecords)
  app.put('/api/templates/update/:id', requireAuth, updateOne)
  app.delete('/api/templates/delete/:id', requireAuth, deleteOne)
}

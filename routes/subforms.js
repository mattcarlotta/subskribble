module.exports = app => {
  const { subforms: { create, index, deleteOne, fetchCounts, fetchRecords, updateOne } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.post('/api/forms/signup', requireAuth, create)
  app.get('/api/forms', requireAuth, index)
  app.get('/api/formcounts', requireAuth, fetchCounts)
  app.get('/api/forms/records', requireAuth, fetchRecords)
  app.put('/api/forms/update/:id', requireAuth, updateOne)
  app.delete('/api/forms/delete/:id', requireAuth, deleteOne)
}

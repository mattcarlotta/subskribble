module.exports = app => {
  const { subscribers: {index, deleteOne, fetchCounts, fetchRecords, updateOne} } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.get('/api/subscribers', requireAuth, index)
  app.get('/api/subscribercounts', requireAuth, fetchCounts)
  app.get('/api/subscribers/records', requireAuth, fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/subscribers/update/:id', requireAuth, updateOne)
  app.delete('/api/subscribers/delete/:id', requireAuth, deleteOne)
}

module.exports = app => {
  const controller = app.controllers.subscribers;

  app.get('/api/subscribers', controller.index)
  app.get('/api/subscribercounts', controller.fetchCounts)
  app.get('/api/subscribers/records', controller.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  // app.put('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.update)
  // app.delete('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.delete)
}

module.exports = app => {
  const { subscribers } = app.controllers;

  app.get('/api/subscribers', subscribers.index)
  app.get('/api/subscribercounts', subscribers.fetchCounts)
  app.get('/api/subscribers/records', subscribers.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/subscribers/update/:id', subscribers.update)
  app.delete('/api/subscribers/delete/:id', subscribers.delete)
}

module.exports = app => {
  const { notifications } = app.controllers;

  app.get('/api/notifications/:id', notifications.index)
  // app.get('/api/plancounts', plans.fetchCounts)
  // app.get('/api/plans/records', plans.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/notification/markasread', notifications.update)
  app.delete('/api/notification/delete/:id', notifications.delete)
}

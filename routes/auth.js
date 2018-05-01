module.exports = app => {
  const { auth: { create, login } } = app.controllers;

  app.get('/api/signup', create);
  app.get('/api/signin', login);
  // app.get('/api/plancounts', plans.fetchCounts)
  // app.get('/api/plans/records', plans.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  // app.put('/api/notification/markasread/:id', updateOne)
  // app.delete('/api/notification/delete', deleteOne)
  // app.delete('/api/notifications/deleteall/:id', deleteAll)
}

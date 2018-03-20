module.exports = app => {
  const { plans } = app.controllers;

  app.get('/api/plans', plans.index)
  app.get('/api/plancounts', plans.fetchCounts)
  // app.get('/api/plans/records', plans.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  // app.put('/api/plans/update/:id', plans.update)
  // app.delete('/api/plans/delete/:id', plans.delete)
}

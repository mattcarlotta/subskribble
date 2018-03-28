module.exports = app => {
  const { promotionals } = app.controllers;

  app.get('/api/promotionals', promotionals.index)
  app.get('/api/promotionalcounts', promotionals.fetchCounts)
  app.get('/api/promotionals/records', promotionals.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/promotionals/update/:id', promotionals.update)
  app.delete('/api/promotionals/delete/:id', promotionals.delete)
}

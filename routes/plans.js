module.exports = app => {
  const { plans: {index, deleteOne, fetchCounts, fetchRecords, updateOne} } = app.controllers;

  app.get('/api/plans', index)
  app.get('/api/plancounts', fetchCounts)
  app.get('/api/plans/records', fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/plans/update/:id', updateOne)
  app.delete('/api/plans/delete/:id', deleteOne)
}

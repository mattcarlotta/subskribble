module.exports = app => {
  const { subscribers: {index, deleteOne, fetchCounts, fetchRecords, updateOne} } = app.controllers;

  app.get('/api/subscribers', index)
  app.get('/api/subscribercounts', fetchCounts)
  app.get('/api/subscribers/records', fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/subscribers/update/:id', updateOne)
  app.delete('/api/subscribers/delete/:id', deleteOne)
}

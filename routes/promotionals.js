module.exports = app => {
  const { promotionals: {index, deleteOne, fetchCounts, fetchRecords, updateOne} } = app.controllers;

  app.get('/api/promotionals', index)
  app.get('/api/promotionalcounts', fetchCounts)
  app.get('/api/promotionals/records', fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  app.put('/api/promotionals/update/:id', updateOne)
  app.delete('/api/promotionals/delete/:id', deleteOne)
}

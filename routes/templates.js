module.exports = (app) => {
  const {
    templates: {
      create,
      index,
      deleteOne,
      fetchAllActiveRecords,
      fetchCounts,
      fetchRecords,
      selectOne,
      updateOne,
      updateStatus,
    },
  } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.post('/api/templates/create', requireAuth, create);
  app.get('/api/templates/template?', requireAuth, selectOne);
  app.get('/api/templates', requireAuth, index);
  app.get('/api/templates/only-active', requireAuth, fetchAllActiveRecords);
  app.get('/api/templatecounts', requireAuth, fetchCounts);
  app.get('/api/templates/records', requireAuth, fetchRecords);
  app.put('/api/templates/status/:id', requireAuth, updateStatus);
  app.put('/api/templates/edit/:id', requireAuth, updateOne);
  app.delete('/api/templates/delete/:id', requireAuth, deleteOne);
};

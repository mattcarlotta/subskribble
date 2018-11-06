module.exports = (app) => {
  const {
    promotionals: {
      apply,
      create,
      index,
      deleteOne,
      fetchCounts,
      fetchRecords,
      updateOne,
      updateStatus,
      selectOne,
    },
  } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.get('/api/promotionals/apply-promotion?', requireAuth, apply);
  app.post('/api/promotionals/create', requireAuth, create);
  app.get('/api/promotionals/promotional?', requireAuth, selectOne);
  app.delete('/api/promotionals/delete/:id', requireAuth, deleteOne);
  app.get('/api/promotionalcounts', requireAuth, fetchCounts);
  app.get('/api/promotionals/records', requireAuth, fetchRecords);
  app.get('/api/promotionals', requireAuth, index);
  app.put('/api/promotionals/edit/:id', requireAuth, updateOne);
  app.put('/api/promotionals/update/:id', requireAuth, updateStatus);
};

module.exports = app => {
  const { notifications: {index, deleteAll, deleteOne, updateAll} } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.get('/api/notifications', requireAuth, index);
  app.put('/api/notification/markasread', requireAuth, updateAll);
  app.delete('/api/notification/delete?', requireAuth, deleteOne);
  app.delete('/api/notifications/deleteall', requireAuth, deleteAll);
}

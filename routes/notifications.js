module.exports = app => {
  const { notifications: { index, deleteAll, deleteOne, updateAll } } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.delete('/api/notifications/deleteall', requireAuth, deleteAll);
  app.delete('/api/notification/delete?', requireAuth, deleteOne);
  app.get('/api/notifications', requireAuth, index);
  app.put('/api/notification/markasread', requireAuth, updateAll);
}

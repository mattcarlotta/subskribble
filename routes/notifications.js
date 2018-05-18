module.exports = app => {
  const { notifications: {index, deleteAll, deleteOne, updateAll} } = app.controllers;
  const passport = app.get("passport");
  const { requireAuth } = app.services.strategies;

  app.get('/api/notifications', (req, res, next) => passport.authenticate('require-login', (err, user) => index(err, user, res, next))(req, res, next));
  // app.get('/api/notifications', requireLogin2, index);
  app.put('/api/notification/markasread', (req, res, next) => passport.authenticate('require-login', (err, user) => updateAll(err, user, res, next))(req, res, next))
  app.delete('/api/notification/delete?', (req, res, next) => passport.authenticate('require-login', (err, user) => deleteOne(err, user, req, res, next))(req, res, next))
  app.delete('/api/notifications/deleteall', (req, res, next) => passport.authenticate('require-login', (err, user) => deleteAll(err, user, res, next))(req, res, next))
}

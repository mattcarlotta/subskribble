module.exports = app => {
  const { auth: { create, login, reset } } = app.controllers;
  const { sendError } = app.shared.helpers;
  const passport = app.get("passport");

  app.post('/api/signup', (req, res, next) => passport.authenticate('local-signup', (err, user) => {
    if (req.error) {
      sendError(req.error, res)
      return next();
    }
    create(req, res);
  })(req, res, next));
  app.post('/api/signin', login);
  app.put('/api/reset-password', reset);
  // app.get('/api/plancounts', plans.fetchCounts)
  // app.get('/api/plans/records', plans.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  // app.put('/api/notification/markasread/:id', updateOne)
  // app.delete('/api/notification/delete', deleteOne)
  // app.delete('/api/notifications/deleteall/:id', deleteAll)
}

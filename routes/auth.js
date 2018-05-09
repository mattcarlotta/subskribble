module.exports = app => {
  const { auth: { create, login, loggedin, reset } } = app.controllers;
  const { sendError } = app.shared.helpers;
  const passport = app.get("passport");

  app.post('/api/signup', (req, res, next) => passport.authenticate('local-signup', () => {
    if (req.error) {
      sendError(req.error, res)
      return next();
    }
    create(req, res);
  })(req, res, next));

  app.post('/api/signin', (req, res, next) => passport.authenticate('local-login', () => {
    if (req.error) {
      sendError(req.error, res)
      return next();
    }
    login(req,res);
  })(req, res, next));

  app.get('/api/loggedin', (req, res, next) => passport.authenticate('local-loggedin', () => {
    if (!req.user) { return next(); }

    if (req.error) {
      sendError(req.error, res)
      return next();
    }
    
    loggedin(req,res);
  })(req, res, next));

  app.put('/api/reset-password', reset);
  // app.get('/api/plancounts', plans.fetchCounts)
  // app.get('/api/plans/records', plans.fetchRecords)
  // app.post('/v1/customers', auth.checkSudo, auth.isActiveUser, controller.create)
  // app.get('/v1/customers/:id', auth.checkSudo, auth.isActiveUser, controller.show)
  // app.put('/api/notification/markasread/:id', updateOne)
  // app.delete('/api/notification/delete', deleteOne)
  // app.delete('/api/notifications/deleteall/:id', deleteAll)
}

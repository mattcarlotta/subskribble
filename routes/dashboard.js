module.exports = (app) => {
  const {
    dashboard: { getAll },
  } = app.controllers;
  const { requireAuth } = app.services.strategies;

  app.get('/api/dashboard', requireAuth, getAll);
};

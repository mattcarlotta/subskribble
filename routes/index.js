module.exports = (app) => {
  require('./auth')(app);
  require('./dashboard')(app);
  require('./messages')(app);
  require('./notifications')(app);
  require('./plans')(app);
  require('./promotionals')(app);
  require('./subscribers')(app);
  require('./templates')(app);
  require('./transactions')(app);
};

module.exports = app => {
  const { db, query: { findUserById } } = app.database;
  const passport = app.get("passport");

  require('./strategies/localSignup');
  require('./strategies/localLogin');
  require('./strategies/requireLogin')
  require('./strategies/resetToken');
  require('./strategies/resetPassword');
}

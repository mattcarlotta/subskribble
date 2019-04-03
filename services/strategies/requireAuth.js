module.exports = app => (req, res, next) => {
  const isEmpty = app.get('isEmpty');
  const { badCredentials } = app.shared.authErrors;

  if (isEmpty(req.session) || !req.session.id) {
    return res.status(401).send({ err: badCredentials });
  }
  next();
};

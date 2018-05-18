module.exports = app => (req, res, next) => {
  const { authErrors } = app.shared;
	if (!req.session.id) return res.status(401).send({ err: authErrors.badCredentials });
	next();
};

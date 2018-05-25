module.exports = app => (req, res, next) => {
  const { notAdmin } = app.shared.authErrors;
	if (!req.session || !req.session.isgod) return res.status(401).send({ err: notAdmin });
	next();
};

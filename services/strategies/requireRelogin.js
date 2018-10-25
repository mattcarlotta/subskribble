module.exports = app => (req, res, next) => {
  if (!req.session.id) return res.status(200).send(null);
  next();
};

module.exports = app => (req, res, next) => {
  const isEmpty = app.get('isEmpty');
  if (isEmpty(req.session) || !req.session.id) return res.status(200).send(null);
  next();
};

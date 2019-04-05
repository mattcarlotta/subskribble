const isEmpty = require('lodash/isEmpty');

module.exports = (req, res, next) => {
  if (isEmpty(req.session) || !req.session.id) return res.status(200).send(null);
  next();
};

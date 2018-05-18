// const _ = require('lodash');

module.exports = app => (req, res, next) => {
	if (!req.session.id) return res.status(401).send({ err: 'You must be logged in!' });
	next();
};

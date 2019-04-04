const db = require('../database/db');
const { getAllDashboardDetails } = require('../database/query');
const { beginofMonth, endofMonth, sendError } = require('../shared/helpers');

module.exports = {
  // GETS ALL DASHBOARD DATA
  getAll: async (req, res, done) => {
    const beginMonth = beginofMonth();
    const endMonth = endofMonth();

    try {
      const dashboard = await db.many(getAllDashboardDetails, [
        req.session.id,
        beginMonth,
        endMonth,
      ]);

      res.status(201).send(...dashboard);
    } catch (err) {
      return sendError(err, res, done);
    }
  },
};

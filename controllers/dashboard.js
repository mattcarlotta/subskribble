import db from 'db';
import { getAllDashboardDetails } from 'queries';
import { beginofMonth, endofMonth, sendError } from 'helpers';

// GETS ALL DASHBOARD DATA
const getAll = async (req, res, done) => {
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
};

export default getAll;

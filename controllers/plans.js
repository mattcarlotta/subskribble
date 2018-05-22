module.exports = app => {
  const { db, query: { deleteOnePlan, getAllPlans, getPlanCount, updateOnePlan } } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  return {
    // DELETES REQURESTED RECORD
    deleteOne: async (req, res, next) => {
      if (!req.params.id) return sendError('Missing plan delete parameters', res, next);

      try {
        const name = await db.result(deleteOnePlan(), [req.params.id, req.session.id]);

        res.status(201).json({ message: `Succesfully deleted ${name.rows[0].planname} plan.` });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
    fetchRecords:  async (req, res, next) => {
      if (!req.query) return sendError('Missing query fetch parameters', res, next);

      let { table, limit, page } = req.query;
      limit = parseStringToNum(limit);
      const offset =  parseStringToNum(page) * limit;
      const status = table === 'activeplans' ? 'active' : 'suspended';

      try {
        let activeplans, inactiveplans;
        const plans = await db.any(getAllPlans(req.session.id, limit, offset, status));

        (table === "activeplans") ? activeplans = plans : inactiveplans = plans;

        res.status(201).json({ activeplans, inactiveplans });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
    fetchCounts: async (req, res, next) => {
      try {
        const plans = await db.any(getPlanCount(), [req.session.id]);

        res.status(201).json({
          activeplancount: parseStringToNum(plans[0].active),
          inactiveplancount: parseStringToNum(plans[0].inactive)
        });
      } catch (err) { return sendError(err, res, next); }
    },
    // SENDS FIRST 10 RECORDS
    index: async (req, res, next) => {
      try {
        const activeplans = await db.any(getAllPlans(req.session.id, 10, 0, 'active'));
        const inactiveplans = await db.any(getAllPlans(req.session.id, 10, 0, 'suspended'));

        res.status(201).json({ activeplans, inactiveplans });
      } catch (err) { return sendError(err, res, next); }
    },
    // UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
    updateOne: async (req, res, next) => {
      if (!req.body || !req.params.id) return sendError('Missing plan update parameters', res, next);
      
      const { id } = req.params;
      const { updateType, statusType } = req.body;

      try {
        const name = await db.one(updateOnePlan(), [statusType, id, req.session.id])

        res.status(201).json({ message: `Succesfully ${updateType} ${name.planname}.` });
      } catch (err) { return sendError(err, res, next); }
    }
  }
}

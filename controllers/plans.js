module.exports = app => {
  const { db, query: {deleteOnePlan, getAllPlans, getPlanCount, updateOnePlan} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  const _index = async (req, res) => {
    try {
      const activeplans = await db.any(getAllPlans(10, 0, 'active'));
      const inactiveplans = await db.any(getAllPlans(10, 0, 'suspended'));

      res.status(201).json({ activeplans, inactiveplans });
    } catch (err) { return sendError(err, res); }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteOnePlan(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted ${name.rows[0].planname} plan.` });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activeplans' ? 'active' : 'suspended';

    try {
      let activeplans, inactiveplans;
      const plans = await db.any(getAllPlans(limit, offset, status));

      (table === "activeplans") ? activeplans = plans : inactiveplans = plans;

      res.status(201).json({ activeplans, inactiveplans });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const plans = await db.any(getPlanCount());

      res.status(201).json({
        activeplancount: parseStringToNum(plans[0].active),
        inactiveplancount: parseStringToNum(plans[0].inactive)
      });
    } catch (err) { return sendError(err, res); }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;

    try {
      const name = await db.one(updateOnePlan(), [statusType, id])

      res.status(201).json({ message: `Succesfully ${updateType} ${name.planname}.` });
    } catch (err) { return sendError(err, res); }
  }


  return {
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    updateOne: (req, res) => _update(req, res),
    deleteOne: (req, res) => _delete(req, res)
  }
}

const query = {
  delete: () => ("DELETE FROM plans WHERE id=$1 RETURNING *"),
  getList: (limit, offset, status) => (`SELECT id, key, status, planName, amount, setupFee, billEvery, trialPeriod, subscribers FROM plans WHERE status='${status}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
  getCount: () => (
    `SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status = 'suspended') as inactive FROM plans;`
  ),
  update: () => ("UPDATE plans SET status=$1 WHERE id=$2 RETURNING planName")
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum } = app.shared.helpers;

  const controller = {
    // plan methods
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    update: (req, res) => _update(req, res),
    delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    try {
      const activeplans = await db.any(query.getList(10, 0, 'active'));
      const inactiveplans = await db.any(query.getList(10, 0, 'suspended'));

      res.status(201).json({ activeplans, inactiveplans });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _delete = async (req, res) => {
    const { id } = req.params;
    try {
      const name = await db.result(query.delete(), id)

      res.status(201).json({ message: `Succesfully deleted ${name.rows[0].planname}.` });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activeplans' ? 'active' : 'suspended';

    try {
      let activeplans, inactiveplans;
      const plans = await db.any(query.getList(limit, offset, status));

      (table === "activeplans") ? activeplans = plans : inactiveplans = plans;

      res.status(201).json({ activeplans, inactiveplans });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const plans = await db.any(query.getCount());

      res.status(201).json({
        activeplancount: parseStringToNum(plans[0].active),
        inactiveplancount: parseStringToNum(plans[0].inactive)
      });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;

    try {
      const name = await db.one(query.update(), [statusType, id])

      res.status(201).json({ message: `Succesfully ${updateType} ${name.planname}.` });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  return controller;
}

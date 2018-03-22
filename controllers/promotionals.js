const query = {
  delete: () => ("DELETE FROM promotionals WHERE id=$1 RETURNING *"),
  getList: (limit, offset, status) => (`SELECT id, key, status, planName, promoCode, amount, startDate, validFor, maxUsage, totalUsage FROM promotionals WHERE status='${status}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
  getCount: () => (
    `SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status = 'suspended') as inactive FROM promotionals;`
  ),
  update: () => ("UPDATE promotionals SET status=$1 WHERE id=$2 RETURNING promoCode, planName")
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum } = app.shared.helpers;

  const controller = {
    // promo methods
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
      const activepromos = await db.any(query.getList(10, 0, 'active'));
      const inactivepromos = await db.any(query.getList(10, 0, 'suspended'));

      res.status(201).json({ activepromos, inactivepromos });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _delete = async (req, res) => {
    const { id } = req.params;
    try {
      const name = await db.result(query.delete(), id);

      res.status(201).json({ message: `Succesfully deleted promo code: ${name.rows[0].promocode} from ${name.rows[0].planname}.` });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activepromotionals' ? 'active' : 'suspended';

    try {
      let activepromos, inactivepromos;
      const promos = await db.any(query.getList(limit, offset, status));

      (table === "activepromotionals") ? activepromos = promos : inactivepromos = promos;

      res.status(201).json({ activepromos, inactivepromos });
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const promos = await db.any(query.getCount());

      res.status(201).json({
        activepromocount: parseStringToNum(promos[0].active),
        inactivepromocount: parseStringToNum(promos[0].inactive)
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

      res.status(201).json({ message: `Succesfully ${updateType} promo code: ${name.promocode} in ${name.planname}.`});
    } catch (err) {
      return res.status(500).json({ err: err.toString() })
    }
  }

  return controller;
}

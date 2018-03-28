const query = {
  deleteItem: () => ("DELETE FROM promotionals WHERE id=$1 RETURNING *"),
  getList: (limit, offset, status) => (`SELECT id, key, status, planName, promoCode, amount, startDate, validFor, maxUsage, totalUsage FROM promotionals WHERE status='${status}' ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
  getCount: () => (
    "SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status = 'suspended') as inactive FROM promotionals;"
  ),
  updateItem: () => ("UPDATE promotionals SET status=$1 WHERE id=$2 RETURNING promoCode, planName")
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const { deleteItem, getList, getCount, updateItem } = query;

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
      const activepromos = await db.any(getList(10, 0, 'active'));
      const inactivepromos = await db.any(getList(10, 0, 'suspended'));

      res.status(201).json({ activepromos, inactivepromos });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteItem(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted promo code: ${name.rows[0].promocode} from ${name.rows[0].planname}.` });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activepromotionals' ? 'active' : 'suspended';

    try {
      let activepromos, inactivepromos;
      const promos = await db.any(getList(limit, offset, status));

      (table === "activepromotionals") ? activepromos = promos : inactivepromos = promos;

      res.status(201).json({ activepromos, inactivepromos });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const promos = await db.any(getCount());

      res.status(201).json({
        activepromocount: parseStringToNum(promos[0].active),
        inactivepromocount: parseStringToNum(promos[0].inactive)
      });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;

    try {
      const name = await db.one(updateItem(), [statusType, id])

      res.status(201).json({ message: `Succesfully ${updateType} promo code: ${name.promocode} in ${name.planname}.`});
    } catch (err) {
      return sendError(err, res);
    }
  }

  return controller;
}

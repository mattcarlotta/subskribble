const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

const query = {
  deleteItem: () => ("DELETE FROM subscribers WHERE id=$1 RETURNING *"),
  getList: (limit, offset, status) => (`SELECT id, key, status, email, subscriber, plan, startdate, enddate, amount FROM subscribers ${statusType(status)} ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
  getCount: () => (
    "SELECT count(*) filter (where status = 'active') AS active, count(*) filter (where status in ('inactive', 'suspended')) as inactive FROM subscribers;"
  ),
  updateItem: () => ("UPDATE subscribers SET status=$1, enddate=$2 WHERE id=$3 RETURNING subscriber")
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const { deleteItem, getList, getCount, updateItem } = query;
  const moment = app.get("moment");

  const controller = {
    // subscribers methods
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
      const activesubscribers = await db.any(getList(10, 0, ['active']));
      const inactivesubscribers = await db.any(getList(10, 0, ['inactive', 'suspended']));

      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteItem(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted ${name.rows[0].subscriber}.` });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];

    try {
      let activesubscribers, inactivesubscribers;
      const subscribers = await db.any(getList(limit, offset, status));

      (table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;

      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const subscribers = await db.any(getCount());

      res.status(201).json({
        activesubscriberscount: parseStringToNum(subscribers[0].active),
        inactivesubscriberscount: parseStringToNum(subscribers[0].inactive)
      });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;
    const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;

    try {
      const name = await db.one(updateItem(), [statusType, endDate, id])

      res.status(201).json({ message: `Succesfully ${updateType} ${name.subscriber}.` });
    } catch (err) {
      return sendError(err, res);
    }
  }

  return controller;
}

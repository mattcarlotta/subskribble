const statusType = status => (status.length > 1 ? `WHERE status='${status[0]}' OR status='${status[1]}'` : `WHERE status='${status[0]}'`);

const query = {
  deleteItem: () => ("DELETE FROM transactions WHERE id=$1 RETURNING *"),
  getList: (limit, offset, status) => (`SELECT id, key, status, status, invoice, planName, subscriber, processor, amount, chargeDate, refundDate FROM transactions ${statusType(status)} ORDER BY key ASC LIMIT ${limit} OFFSET ${offset};`),
  getCount: () => (
    "SELECT count(*) filter (where status in ('paid', 'due')) AS charges, count(*) filter (where status in ('refund', 'credit')) AS refunds FROM transactions;"
  ),
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const { deleteItem, getList, getCount } = query;

  const controller = {
    // transaction methods
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    try {
      const chargetransactions = await db.any(getList(10, 0, ['paid', 'due']));
      const refundtransactions = await db.any(getList(10, 0, ['refund', 'credit']));

      res.status(201).json({ chargetransactions, refundtransactions });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteItem(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted the ${name.rows[0].status} transaction from ${name.rows[0].planname}.` });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === "charges" ? ['paid','due'] : ['refund', 'credit'];

    try {
      let chargetransactions, refundtransactions;
      const charges = await db.any(getList(limit, offset, status));

      (table === "charges") ? chargetransactions = charges : refundtransactions = charges;

      res.status(201).json({ chargetransactions, refundtransactions });
    } catch (err) {
      return sendError(err, res);
    }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const tranasctions = await db.any(getCount());

      res.status(201).json({
        chargecount: parseStringToNum(tranasctions[0].charges),
        refundcount: parseStringToNum(tranasctions[0].refunds)
      });
    } catch (err) {
      return sendError(err, res);
    }
  }

  return controller;
}

module.exports = app => {
  const { db, query: {deleteOneTransactaction, getSomeTransactactions, getTransactactionCount} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  const _index = async (req, res) => {
    try {
      const chargetransactions = await db.any(getSomeTransactactions(10, 0, ['paid', 'due']));
      const refundtransactions = await db.any(getSomeTransactactions(10, 0, ['refund', 'credit']));

      res.status(201).json({ chargetransactions, refundtransactions });
    } catch (err) { return sendError(err, res); }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteOneTransactaction(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted the ${name.rows[0].status} transaction from ${name.rows[0].planname}.` });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === "charges" ? ['paid','due'] : ['refund', 'credit'];

    try {
      let chargetransactions, refundtransactions;
      const charges = await db.any(getSomeTransactactions(limit, offset, status));

      (table === "charges") ? chargetransactions = charges : refundtransactions = charges;

      res.status(201).json({ chargetransactions, refundtransactions });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const tranasctions = await db.any(getTransactactionCount());

      res.status(201).json({
        chargecount: parseStringToNum(tranasctions[0].charges),
        refundcount: parseStringToNum(tranasctions[0].refunds)
      });
    } catch (err) { return sendError(err, res); }
  }

  return {
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    deleteOne: (req, res) => _delete(req, res)
  }
}

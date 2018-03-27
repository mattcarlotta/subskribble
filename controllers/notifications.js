const query = {
  deleteItem: () => ("DELETE FROM notifications WHERE id=$1 RETURNING *"),
  getList: () => (`SELECT id, subscriber, messageDate, message FROM notifications WHERE status='unread' ORDER BY key ASC LIMIT 99`),
  updateItem: () => ("UPDATE notifications SET status=$1 WHERE id=$2 RETURNING *")
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const { deleteItem, getList, updateItem } = query;

  const controller = {
    // plan methods
    index: (req, res) => _index(req,res),
    // fetchRecords: (req, res) => _fetchRecords(req, res),
    // fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    update: (req, res) => _update(req, res),
    // delete: (req, res) => _delete(req, res)
  }

  const _index = async (req, res) => {
    try {
      const notifications = await db.any(getList());

      res.status(201).json({ notifications });
    } catch (err) {
      return sendError(err, res);
    }
  }

  // const _delete = async (req, res) => {
  //   try {
  //     const name = await db.result(deleteItem(), req.params.id);
  //
  //     res.status(201).json({ message: `Succesfully deleted ${name.rows[0].planname} plan.` });
  //   } catch (err) {
  //     return sendError(err, res);
  //   }
  // }
  //
  // const _fetchRecords = async (req, res) => {
  //   let { table, limit, page } = req.query;
  //   limit = parseStringToNum(limit);
  //   const offset =  parseStringToNum(page) * limit;
  //   const status = table === 'activeplans' ? 'active' : 'suspended';
  //
  //   try {
  //     let activeplans, inactiveplans;
  //     const plans = await db.any(getList(limit, offset, status));
  //
  //     (table === "activeplans") ? activeplans = plans : inactiveplans = plans;
  //
  //     res.status(201).json({ activeplans, inactiveplans });
  //   } catch (err) {
  //     return sendError(err, res);
  //   }
  // }
  //
  // const _fetchCounts = async (req, res) => {
  //   try {
  //     const plans = await db.any(getCount());
  //
  //     res.status(201).json({
  //       activeplancount: parseStringToNum(plans[0].active),
  //       inactiveplancount: parseStringToNum(plans[0].inactive)
  //     });
  //   } catch (err) {
  //     return sendError(err, res);
  //   }
  // }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;

    try {
      const note = await db.one(updateItem(), ['read', id])

      res.status(201).json({ message: `Succesfully mark ${note.id} as read.` });
    } catch (err) {
      return sendError(err, res);
    }
  }

  return controller;
}

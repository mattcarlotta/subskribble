const query = {
  deleteAll: () => ("DELETE FROM notifications WHERE userid=$1"),
  deleteOne: () => ("DELETE FROM notifications WHERE id=$1 AND userid=$2"),
  getList: () => (`
    (SELECT array_to_json(array_agg(row_to_json(x)))
    from ((SELECT * FROM notifications WHERE READ = false AND userid=$1 LIMIT 99)) x)
    UNION ALL
    SELECT array_to_json(array_agg(row_to_json(y)))
    from ((SELECT * FROM notifications WHERE READ = true AND deleted = false AND userid=$1 LIMIT 99)) y;
  `),
  updateOne: () => (`UPDATE notifications SET read=true WHERE read=false AND userid=$1`)
}

module.exports = app => {
  const { db } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const { deleteAll, deleteOne, getList, updateOne } = query;

  const controller = {
    // plan methods
    index: (req, res) => _index(req,res),
    // fetchRecords: (req, res) => _fetchRecords(req, res),
    // fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    update: (req, res) => _update(req, res),
    delete: (req, res) => _delete(req, res),
    deleteAll: (req, res) => _deleteAll(req, res)
  }

  // collects all notifications for requested user
  const _index = async (req, res) => {
    console.log(req.params.id);
    try {
      const noteList = await db.any(getList(), req.params.id);

      res.status(201).json({
        unreadNotifications: noteList[0].array_to_json,
        readNotifications: noteList[1].array_to_json
      });
    } catch (err) {
      return sendError(err, res);
    }
  }

  // deletes one notification
  const _delete = async (req, res) => {
    try {
      await db.result(deleteOne(), [req.query.id, req.query.userid]);

      res.status(201).json({});
    } catch (err) {
      return sendError(err, res);
    }
  }

  // deletes all notifications
  const _deleteAll = async (req, res) => {
    try {
      await db.result(deleteAll(), req.params.id);

      res.status(201).json({});
    } catch (err) {
      return sendError(err, res);
    }
  }

  // sets all notifications as read
  const _update = async (req, res) => {
    try {
      await db.oneOrNone(updateOne(), req.params.id);

      res.status(201).json({ message: `Succesfully marked all notes as read.` });
    } catch (err) {
      return sendError(err, res);
    }
  }

  return controller;
}

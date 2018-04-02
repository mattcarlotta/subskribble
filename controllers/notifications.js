module.exports = app => {
  const { db, query: {deleteAllNotifications, deleteOneNotification, getSomeNotifications, updateOneNotification} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  // collects all notifications for requested user
  const _index = async (req, res) => {
    try {
      const noteList = await db.any(getSomeNotifications(), req.params.id);

      res.status(201).json({
        unreadNotifications: noteList[0].array_to_json,
        readNotifications: noteList[1].array_to_json
      });
    } catch (err) { return sendError(err, res); }
  }

  // deletes one notification
  const _delete = async (req, res) => {
    try {
      await db.result(deleteOneNotification(), [req.query.id, req.query.userid]);

      res.status(201).json({});
    } catch (err) { return sendError(err, res); }
  }

  // deletes all notifications
  const _deleteAll = async (req, res) => {
    try {
      await db.result(deleteAllNotifications(), req.params.id);

      res.status(201).json({});
    } catch (err) { return sendError(err, res); }
  }

  // sets all notifications as read
  const _update = async (req, res) => {
    try {
      await db.oneOrNone(updateOneNotification(), req.params.id);

      res.status(201).json({ message: `Succesfully marked all notes as read.` });
    } catch (err) { return sendError(err, res); }
  }

  return {
    index: (req, res) => _index(req,res),
    // fetchRecords: (req, res) => _fetchRecords(req, res),
    // fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    updateOne: (req, res) => _update(req, res),
    deleteOne: (req, res) => _delete(req, res),
    deleteAll: (req, res) => _deleteAll(req, res)
  }
}

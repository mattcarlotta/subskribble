module.exports = app => {
  const { db, query: { createNotification, deleteAllNotifications, deleteOneNotification, getSomeNotifications, setReadNotifications} } = app.database;
  const { sendError } = app.shared.helpers;

  return {
    // COLLECTS/SENDS ALL NOTIFICATIONS FOR USER
    index: async (req, res, next) => {
      try {
        // await db.none(createNotification(), [req.session.id, `This is a generic notification created for testing!`])
        const noteList = await db.any(getSomeNotifications(), [req.session.id]);

        res.status(201).json({
          unreadNotifications: noteList[0].array_to_json,
          readNotifications: noteList[1].array_to_json
        });
      } catch (err) { return sendError(err, res, next) }
    },
    // UPDATES ALL NOTIFICATIONS AS READ FOR USER
    updateAll: async (req, res, next) => {
      try {
        await db.oneOrNone(setReadNotifications(), [req.session.id]);

        res.status(201).json({});
      } catch (err) { return sendError(err, res, next) }
    },
    // DELETES ONE NOTIFICATION
    deleteOne: async (req, res, next) => {
      try {
        await db.result(deleteOneNotification(), [req.session.id, req.query.id]);

        res.status(201).json({});
      } catch (err) { return sendError(err, res, next) }
    },
    // DELETES ALL NOTIFICATIONS
    deleteAll: async (req, res, next) => {
      try {
        await db.result(deleteAllNotifications(), [req.session.id]);

        res.status(201).json({});
      } catch (err) { return sendError(err, res, next); }
    }
  }
}

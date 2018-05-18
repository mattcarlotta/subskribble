module.exports = app => {
  const { db, query: { createNotification, deleteAllNotifications, deleteOneNotification, getSomeNotifications, setReadNotifications} } = app.database;
  const { sendError } = app.shared.helpers;

  return {
    // COLLECTS/SENDS ALL NOTIFICATIONS FOR USER
    index: async (err, user, res, next) => {
      if (err) return sendError(err, res, next);
      if (!user) return next();

      try {
        // await db.none(createNotification(), [user.id, `This is a generic notification created for testing!`])
        const noteList = await db.any(getSomeNotifications(), [user.id]);

        res.status(201).json({
          unreadNotifications: noteList[0].array_to_json,
          readNotifications: noteList[1].array_to_json
        });
      } catch (err) { return sendError(err, res, next) }
    },
    // UPDATES ALL NOTIFICATIONS AS READ FOR USER
    updateAll: async (err, user, res, next) => {
      if (err) return sendError(err, res, next);
      if (!user) return next();

      try {
        await db.oneOrNone(setReadNotifications(), [user.id]);

        res.status(201).json({});
      } catch (err) { return sendError(err, res, next) }
    },
    // DELETES ONE NOTIFICATION
    deleteOne: async (err, user, req, res, next) => {
      if (err) return sendError(err, res, next);
      if (!req.query) return sendError('Could not find notification to delete!', res, next);
      if (!user) return next();

      try {
        await db.result(deleteOneNotification(), [user.id, req.query.id]);

        res.status(201).json({});
      } catch (err) { return sendError(err, res, next) }
    },
    // DELETES ALL NOTIFICATIONS
    deleteAll: async (err, user, res, next) => {
      if (err) return sendError(err, res, next);
      if (!user) return next();

      try {
        await db.result(deleteAllNotifications(), [user.id]);

        res.status(201).json({});
      } catch (err) { return sendError(err, res, next); }
    }
  }
}

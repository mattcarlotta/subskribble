module.exports = app => {
  const { db, query: {deleteOneSubcriber, getSomeSubcribers, getSubscriberCount, updateOneSubscriber} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const moment = app.get("moment");

  const _index = async (req, res) => {
    try {
      const activesubscribers = await db.any(getSomeSubcribers(10, 0, ['active']));
      const inactivesubscribers = await db.any(getSomeSubcribers(10, 0, ['inactive', 'suspended']));

      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) { return sendError(err, res); }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteOneSubcriber(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted ${name.rows[0].subscriber}.` });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];

    try {
      let activesubscribers, inactivesubscribers;
      const subscribers = await db.any(getSomeSubcribers(limit, offset, status));

      (table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;

      res.status(201).json({ activesubscribers, inactivesubscribers });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const subscribers = await db.any(getSubscriberCount());

      res.status(201).json({
        activesubscriberscount: parseStringToNum(subscribers[0].active),
        inactivesubscriberscount: parseStringToNum(subscribers[0].inactive)
      });
    } catch (err) { return sendError(err, res); }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;
    const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;

    try {
      const name = await db.one(updateOneSubscriber(), [statusType, endDate, id])

      res.status(201).json({ message: `Succesfully ${updateType} ${name.subscriber}.` });
    } catch (err) { return sendError(err, res); }
  }

  return {
    index: (req, res) => _index(req,res),
    fetchRecords: (req, res) => _fetchRecords(req, res),
    fetchCounts: (req, res) => _fetchCounts(req, res),
    // create: (req, res) => _create(req,res)
    // show: (req, res) => _show(req,res)
    updateOne: (req, res) => _update(req, res),
    deleteOne: (req, res) => _delete(req, res)
  }
}

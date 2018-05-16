module.exports = app => {
  const { db, query: {deleteOnePromotion, getAllPromotions, getPromotionCount, updateOnePromotion} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  const _index = async (req, res) => {
    try {
      const activepromos = await db.any(getAllPromotions(10, 0, 'active'));
      const inactivepromos = await db.any(getAllPromotions(10, 0, 'suspended'));

      res.status(201).json({ activepromos, inactivepromos });
    } catch (err) { return sendError(err, res); }
  }

  const _delete = async (req, res) => {
    try {
      const name = await db.result(deleteOnePromotion(), req.params.id);

      res.status(201).json({ message: `Succesfully deleted promo code: ${name.rows[0].promocode} from ${name.rows[0].planname}.` });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchRecords = async (req, res) => {
    let { table, limit, page } = req.query;
    limit = parseStringToNum(limit);
    const offset =  parseStringToNum(page) * limit;
    const status = table === 'activepromotionals' ? 'active' : 'suspended';

    try {
      let activepromos, inactivepromos;
      const promos = await db.any(getAllPromotions(limit, offset, status));

      (table === "activepromotionals") ? activepromos = promos : inactivepromos = promos;

      res.status(201).json({ activepromos, inactivepromos });
    } catch (err) { return sendError(err, res); }
  }

  const _fetchCounts = async (req, res) => {
    try {
      const promos = await db.any(getPromotionCount());

      res.status(201).json({
        activepromocount: parseStringToNum(promos[0].active),
        inactivepromocount: parseStringToNum(promos[0].inactive)
      });
    } catch (err) { return sendError(err, res); }
  }

  const _update = async (req, res) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;

    try {
      const name = await db.one(updateOnePromotion(), [statusType, id])

      res.status(201).json({ message: `Succesfully ${updateType} promo code: ${name.promocode} in ${name.planname}.`});
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

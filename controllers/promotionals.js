module.exports = app => {
  const { db, query: {deleteOnePromotion, getAllPromotions, getPromotionCount, updateOnePromotion} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  return {
    // DELETES REQURESTED RECORD
    deleteOne: async (req, res, next) => {
      if (!req.params.id) return sendError('Missing promotional delete parameters', res, next);

      try {
        const name = await db.result(deleteOnePromotion(), [req.params.id, req.session.id]);

        res.status(201).json({ message: `Succesfully deleted promo code: ${name.rows[0].promocode} from ${name.rows[0].planname}.` });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
    fetchRecords: async (req, res, next) => {
      if (!req.query) return sendError('Missing query fetch parameters', res, next);

      let { table, limit, page } = req.query;
      limit = parseStringToNum(limit);
      const offset =  parseStringToNum(page) * limit;
      const status = table === 'activepromotionals' ? 'active' : 'suspended';

      try {
        let activepromos, inactivepromos;
        const promos = await db.any(getAllPromotions(req.session.id, limit, offset, status));

        (table === "activepromotionals") ? activepromos = promos : inactivepromos = promos;

        res.status(201).json({ activepromos, inactivepromos });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
    fetchCounts: async (req, res, next) => {
      try {
        const promos = await db.any(getPromotionCount(), [req.session.id]);

        res.status(201).json({
          activepromocount: parseStringToNum(promos[0].active),
          inactivepromocount: parseStringToNum(promos[0].inactive)
        });
      } catch (err) { return sendError(err, res, next); }
    },
    // SENDS FIRST 10 RECORDS
    index: async (req, res, next) => {
      try {
        const activepromos = await db.any(getAllPromotions(req.session.id, 10, 0, 'active'));
        const inactivepromos = await db.any(getAllPromotions(req.session.id, 10, 0, 'suspended'));

        res.status(201).json({ activepromos, inactivepromos });
      } catch (err) { return sendError(err, res, next); }
    },
    // UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
    updateOne: async (req, res, next) => {
      if (!req.body || !req.params.id) return sendError('Missing plan update parameters', res, next);

      const { id } = req.params;
      const { updateType, statusType } = req.body;

      try {
        const name = await db.one(updateOnePromotion(), [statusType, id, req.session.id])

        res.status(201).json({ message: `Succesfully ${updateType} promo code: ${name.promocode} in ${name.planname}.`});
      } catch (err) { return sendError(err, res, next); }
    }
  }
}

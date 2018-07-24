module.exports = app => {
  const { db, query: {createPromotion, deleteOnePromotion, findPromoById, getAllPromotions, getPromotionCount, updatePromotion, updatePromotionStatus, selectPromotionCode, selectPromotionDetails} } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;

  return {
    apply: async (req, res, next) => {
      console.log('req.query', req.query);
      if (!req.query)  return sendError('Missing promotional plan parameters.', res, next);

      const { promocode, plan } = req.query;
      try {
        const promotional = await db.oneOrNone(selectPromotionDetails(), [req.session.id, promocode, [plan]]);
        console.log('promotional', promotional)
        if (!promotional) return sendError("That promo code is invalid and/or can't be applied to the selected plan.", res, next);

        // await db.none(createPromotion(), [req.session.id, amount, datestamps, discounttype, enddate, promocode, plans, allowedUsage, startdate]);

        res.status(201).json({ promotional });
      } catch (err) { return sendError(err, res, next); }
    },
    // CREATES PROMO RECORD
    create: async (req, res, next) => {
      if (!req.body) return sendError('Missing promotional creation parameters.', res, next);
      const { amount, datestamps, discounttype, enddate, promocode, plans, maxusage, startdate } = req.body;

      if (!amount || !datestamps || !discounttype || !enddate || !promocode || !plans || !startdate) return sendError('Missing promotional creation parameters', res, next);

      const allowedUsage = maxusage ? parseStringToNum(maxusage) : 2147483647;

      try {
        const promoExists = await db.oneOrNone(selectPromotionCode(), [req.session.id, promocode]);
        if (promoExists) return sendError('That promotional already exists. You must create a unique promotional name.', res, next);

        await db.none(createPromotion(), [req.session.id, amount, datestamps, discounttype, enddate, promocode, plans, allowedUsage, startdate]);

        res.status(201).json({ message: `Succesfully created promotional: ${promocode}` });
      } catch (err) { return sendError(err, res, next); }
    },
    // DELETES REQURESTED RECORD
    deleteOne: async (req, res, next) => {
      if (!req.params.id) return sendError('Missing promotional delete parameters.', res, next);

      try {
        const name = await db.result(deleteOnePromotion(), [req.params.id, req.session.id]);

        res.status(201).json({ message: `Succesfully deleted promotional: ${name.rows[0].promocode}.` });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
    fetchRecords: async (req, res, next) => {
      if (!req.query) return sendError('Missing query fetch parameters.', res, next);

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
    // UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
    updateOne: async (req, res, next) => {
      if (!req.body || !req.params.id) return sendError('Missing promotional creation parameters.', res, next);

      const { amount, datestamps, discounttype, enddate, promocode, plans, maxusage, startdate } = req.body;
      if (!amount || !datestamps || !discounttype || !enddate || !promocode || !plans || !startdate) return sendError('Missing promotional creation parameters', res, next);

      const allowedUsage = maxusage ? parseStringToNum(maxusage) : 2147483647;

      try {
        await db.none(updatePromotion(), [req.session.id, req.params.id, amount, datestamps, discounttype, enddate, promocode, plans, allowedUsage, startdate]);

        res.status(201).json({ message: `Succesfully updated promotional: ${promocode}` });
      } catch (err) { return sendError(err, res, next); }
    },
    // UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
    updateStatus: async (req, res, next) => {
      if (!req.body || !req.params.id) return sendError('Missing plan update parameters.', res, next);

      const { id } = req.params;
      const { updateType, statusType } = req.body;

      try {
        const name = await db.one(updatePromotionStatus(), [statusType, id, req.session.id])

        res.status(201).json({ message: `Succesfully ${updateType} promo code: ${name.promocode}`});
      } catch (err) { return sendError(err, res, next); }
    },
    // SELECTS A SINGLE RECORD
    selectOne: async (req, res, next) => {
      if (!req.query) return sendError('Missing promo select parameters.', res, next);
      console.log(req.query)
      try {
        const promotional = await db.oneOrNone(findPromoById(), [req.session.id, req.query.id]);
        if (!promotional) return sendError("Unable to locate the promotional.", res, next);

        res.status(201).json({ ...promotional });
      } catch (err) { return sendError(err, res, next); }
    },
  }
}

module.exports = app => {
	const { db, query: {createPromotion, deleteOnePromotion, findPromoById, getAllPromotions, getPromotionCount, updatePromotion, updatePromotionStatus, selectPromotionCode, selectPromotionDetails} } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;

	return {
		// LOOKS UP PROMOCODE PER CLIENT-SIDE REQUEST
		apply: async (req, res, done) => {
			if (!req.query)  return sendError('Missing promotional plan parameters.', res, done);
			const { promocode, plan } = req.query;

			try {
				const promotional = await db.oneOrNone(selectPromotionDetails(), [req.session.id, promocode, [plan]]);
				if (!promotional) return sendError("That promo code is invalid and/or can't be applied to the selected plan.", res, done);

				res.status(201).json({ promotional });
			} catch (err) { return sendError(err, res, done); }
		},
		// CREATES PROMO RECORD
		create: async (req, res, done) => {
			if (!req.body) return sendError('Missing promotional creation parameters.', res, done);
			const { amount, datestamps, discounttype, enddate, promocode, plans, maxusage, startdate } = req.body;

			if (!amount || !datestamps || !discounttype || !enddate || !promocode || !plans || !startdate) return sendError('Missing promotional creation parameters', res, done);

			const allowedUsage = maxusage ? parseStringToNum(maxusage) : 2147483647;

			try {
				const promoExists = await db.oneOrNone(selectPromotionCode(), [req.session.id, promocode]);
				if (promoExists) return sendError('That promotional already exists. You must create a unique promotional name.', res, done);

				await db.none(createPromotion(), [req.session.id, amount, datestamps, discounttype, enddate, promocode, plans, allowedUsage, startdate]);

				res.status(201).json({ message: `Succesfully created promotional: ${promocode}` });
			} catch (err) { return sendError(err, res, done); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, done) => {
			if (!req.params.id) return sendError('Missing promotional delete parameters.', res, done);

			try {
				const name = await db.result(deleteOnePromotion(), [req.params.id, req.session.id]);

				res.status(201).json({ message: `Succesfully deleted promotional: ${name.rows[0].promocode}.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, done) => {
			if (!req.query) return sendError('Missing query fetch parameters.', res, done);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activepromotionals' ? 'active' : 'suspended';

			try {
				let activepromos, inactivepromos;
				const promos = await db.any(getAllPromotions(req.session.id, limit, offset, status));

				(table === "activepromotionals") ? activepromos = promos : inactivepromos = promos;

				res.status(201).json({ activepromos, inactivepromos });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, done) => {
			try {
				const promos = await db.any(getPromotionCount(), [req.session.id]);

				res.status(201).json({
					activepromocount: parseStringToNum(promos[0].active),
					inactivepromocount: parseStringToNum(promos[0].inactive)
				});
			} catch (err) { return sendError(err, res, done); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, done) => {
			try {
				const activepromos = await db.any(getAllPromotions(req.session.id, 10, 0, 'active'));
				const inactivepromos = await db.any(getAllPromotions(req.session.id, 10, 0, 'suspended'));

				res.status(201).json({ activepromos, inactivepromos });
			} catch (err) { return sendError(err, res, done); }
		},
		// UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
		updateOne: async (req, res, done) => {
			if (!req.body || !req.params.id) return sendError('Missing promotional creation parameters.', res, done);

			const { amount, datestamps, discounttype, enddate, promocode, plans, maxusage, startdate } = req.body;
			if (!amount || !datestamps || !discounttype || !enddate || !promocode || !plans || !startdate) return sendError('Missing promotional creation parameters', res, done);

			const allowedUsage = maxusage ? parseStringToNum(maxusage) : 2147483647;

			try {
				await db.none(updatePromotion(), [req.session.id, req.params.id, amount, datestamps, discounttype, enddate, promocode, plans, allowedUsage, startdate]);

				res.status(201).json({ message: `Succesfully updated promotional: ${promocode}` });
			} catch (err) { return sendError(err, res, done); }
		},
		// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		updateStatus: async (req, res, done) => {
			if (!req.body || !req.params.id) return sendError('Missing plan update parameters.', res, done);

			const { id } = req.params;
			const { updateType, statusType } = req.body;

			try {
				const name = await db.one(updatePromotionStatus(), [statusType, id, req.session.id])

				res.status(201).json({ message: `Succesfully ${updateType} promo code: ${name.promocode}`});
			} catch (err) { return sendError(err, res, done); }
		},
		// SELECTS A SINGLE RECORD
		selectOne: async (req, res, done) => {
			if (!req.query) return sendError('Missing promo select parameters.', res, done);

			try {
				const promotional = await db.oneOrNone(findPromoById(), [req.session.id, req.query.id]);
				if (!promotional) return sendError("Unable to locate the promotional.", res, done);

				res.status(201).json({ ...promotional });
			} catch (err) { return sendError(err, res, done); }
		},
	}
}

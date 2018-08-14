module.exports = app => {
	const { db, query: { deleteOneTransactaction, getSomeTransactactions, getTransactactionCount } } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;

	return {
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, done) => {
			if (!req.params.id) return sendError('Missing transaction delete parameters', res, done);

			try {
				const name = await db.result(deleteOneTransactaction(), [req.params.id, req.session.id]);

				res.status(201).json({ message: `Succesfully deleted the ${name.rows[0].status} transaction from ${name.rows[0].planname}.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, done) => {
			if (!req.query) return sendError('Missing query fetch parameters', res, done);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === "charges" ? ['paid','due'] : ['refund', 'credit'];

			try {
				let chargetransactions, refundtransactions;
				const charges = await db.any(getSomeTransactactions(req.session.id, limit, offset, status));

				(table === "charges") ? chargetransactions = charges : refundtransactions = charges;

				res.status(201).json({ chargetransactions, refundtransactions });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, done) => {
			try {
				const tranasctions = await db.any(getTransactactionCount(), [req.session.id]);

				res.status(201).json({
					chargecount: parseStringToNum(tranasctions[0].charges),
					refundcount: parseStringToNum(tranasctions[0].refunds)
				});
			} catch (err) { return sendError(err, res, done); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, done) => {
			try {
				const chargetransactions = await db.any(getSomeTransactactions(req.session.id, 10, 0, ['paid', 'due']));
				const refundtransactions = await db.any(getSomeTransactactions(req.session.id, 10, 0, ['refund', 'credit']));

				res.status(201).json({ chargetransactions, refundtransactions });
			} catch (err) { return sendError(err, res, done); }
		}
	}
}

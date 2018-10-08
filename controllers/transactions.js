module.exports = app => {
	const { db, query: { createNotification, deleteOneTransactaction, getSomeTransactactions, getTransactionCount, getSubscriberId, refundTransaction, selectTransactionById, updateSubscriberCredits } } = app.database;
	const { currentDate, parseStringToNum, sendError } = app.shared.helpers;
	const { itemAlreadyExists, missingCreationParams, missingDeletionParams, missingQueryParams, missingSelectParams, missingUpdateParams, unableToLocate } = app.shared.errors;

	return {
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, done) => {
			if (!req.params.id) return sendError(missingDeletionParams, res, done);
			const date = currentDate();

			try {
				await db.task('delete-transaction', async dbtask => {
					const name = await dbtask.result(deleteOneTransactaction, [req.session.id, req.params.id]);

					await dbtask.none(createNotification, [req.session.id, 'payment', `The following invoice: ${name.rows[0].invoice}, has been deleted.`, date]);

					res.status(201).json({ message: `Successfully deleted the ${name.rows[0].status} transaction from ${name.rows[0].planname}.` });
				})
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, done) => {
			try {
				const transactions = await db.any(getTransactionCount, [req.session.id]);

				res.status(201).json({
					chargecount: parseStringToNum(transactions[0].charges),
					refundcount: parseStringToNum(transactions[0].refunds)
				});
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES A SINGLE RECORD
		fetchOne: async (req, res, done) => {
			if (!req.query) return sendError(missingQueryParams, res, done);

			try {
				const transaction = await db.oneOrNone(selectTransactionById, [req.session.id, req.query.id])
				if (!transaction) return sendError(unableToLocate('transaction'), res, done);

				res.status(201).json({ ...transaction });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, done) => {
			if (!req.query) return sendError(missingQueryParams, res, done);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === "charges" ? ['paid','due'] : ['refund', 'credit'];

			try {
				let chargetransactions, refundtransactions;
				const charges = await db.any(getSomeTransactactions(req.session.id, limit, offset, status));

				(table === "charges")
					? chargetransactions = charges
					: refundtransactions = charges

				res.status(201).json({ chargetransactions, refundtransactions });
			} catch (err) { return sendError(err, res, done); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, done) => {
			try {
				await db.task('fetch-transactions-index', async dbtask => {
					const chargetransactions = await dbtask.any(getSomeTransactactions(req.session.id, 10, 0, ['paid', 'due']));
					const refundtransactions = await dbtask.any(getSomeTransactactions(req.session.id, 10, 0, ['refund', 'credit']));

					res.status(201).json({ chargetransactions, refundtransactions });
				})
			} catch (err) { return sendError(err, res, done); }
		},
		// REFUNDS OR CREDITS A TRANSACTION
		refundOne: async (req, res, done) => {
			if (!req.body) return sendError(missingUpdateParams, res, done);
			const { amount, email, id, planname, processor, subscriber, transactiontype } = req.body;
			const date = currentDate();

			try {
				await db.task('refund-transaction', async dbtask => {
					if (transactiontype === "credit") {
						const user = await dbtask.oneOrNone(getSubscriberId, [req.session.id, email]);
						if (!user) return sendError(unableToLocate('subscriber'), res, done);

						await dbtask.none(updateSubscriberCredits, [req.session.id, user.id, amount]);
					}

					await dbtask.none(refundTransaction, [req.session.id, transactiontype, planname, email, subscriber, processor, amount, date]);

					await dbtask.none(createNotification, [req.session.id, 'payment', `The following subscriber: ${subscriber}, has been ${transactiontype}ed the following amount: $${amount}`, date]);

					res.status(201).json({ message: `Successfully ${transactiontype}ed ${subscriber}.` });
				})
			} catch (err) { return sendError(err, res, done); }

		}
	}
}

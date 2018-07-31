module.exports = app => {
	const { db, query: { createSubscriber, deleteOneSubcriber, findSubscriberByEmail, getSomeSubcribers, getSubscriberCount, updateOneSubscriber} } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;
	const moment = app.get("moment");

	return {
		// CREATES SUBSCRIBER RECORD
		create: async (req, res, next) => {
			if (!req.body) return sendError('Missing subscriber creation parameters', res, next);

			const {
				amount,
				billingAddress,
				billingCity,
				billingState,
				billingUnit,
				billingZip,
				contactEmail,
				contactAddress,
				contactCity,
				contactPhone,
				contactState,
				contactUnit,
				contactZip,
				creditCard,
				creditCardExpMonth,
				creditCardExpYear,
				creditCardCVV,
				promoCode,
				sameBillingAddress,
				selectedPlan,
				subscriber,
			} = req.body;
			const startDate = moment().format("MMMM Do, YYYY");

			try {
				const existingUser = await db.oneOrNone(findSubscriberByEmail(), [contactEmail, selectedPlan]);
				if (existingUser) return sendError(`Can't create duplicate subscribers within the same plan. The provided email: ${contactEmail}, is already associated with the following plan: ${existingUser.planname}.`, res, next);

				await db.none(createSubscriber(), [req.session.id, subscriber, amount, billingAddress, billingCity, billingState, billingUnit, billingZip, contactEmail, contactAddress, contactCity, contactPhone, contactState, contactUnit, contactZip, promoCode, sameBillingAddress, selectedPlan, startDate]);

				res.status(201).json({ message: `Succesfully added ${subscriber} to the ${selectedPlan} plan` });
			} catch (err) { return sendError(err, res, next); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, next) => {
			if (!req.query.planname || !req.query.subscriberid) return sendError('Missing subscriber delete parameters', res, next);
			const { planname, subscriberid } = req.query;

			try {
				const name = await db.result(deleteOneSubcriber(), [req.session.id, subscriberid, planname]);

				res.status(201).json({ message: `Succesfully deleted ${name.rows[0].subscriber} from the '${name.rows[0].planname}' plan.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, next) => {
			if (!req.query) return sendError('Missing query fetch parameters', res, next);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];

			try {
				let activesubscribers, inactivesubscribers;
				const subscribers = await db.any(getSomeSubcribers(req.session.id, limit, offset, status));

				(table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;

				res.status(201).json({ activesubscribers, inactivesubscribers });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, next) => {
			try {
				const subscribers = await db.any(getSubscriberCount(), [req.session.id]);

				res.status(201).json({
					activesubscriberscount: parseStringToNum(subscribers[0].active),
					inactivesubscriberscount: parseStringToNum(subscribers[0].inactive)
				});
			} catch (err) { return sendError(err, res, next); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, next) => {
			try {
				const activesubscribers = await db.any(getSomeSubcribers(req.session.id, 10, 0, ['active']));
				const inactivesubscribers = await db.any(getSomeSubcribers(req.session.id, 10, 0, ['inactive', 'suspended']));

				res.status(201).json({ activesubscribers, inactivesubscribers });
			} catch (err) { return sendError(err, res, next); }
		},
		// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		updateOne: async (req, res, next) => {
			if (!req.body || !req.params.id) return sendError('Missing subscriber update parameters', res, next);
			const { id } = req.params;
			const { updateType, statusType } = req.body;
			const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;

			try {
				const name = await db.one(updateOneSubscriber(), [statusType, endDate, id, req.session.id])

				res.status(201).json({ message: `Succesfully ${updateType} ${name.subscriber}.` });
			} catch (err) { return sendError(err, res, next); }
		}
	}
}

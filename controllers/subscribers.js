module.exports = app => {
	const { db, query: {
		createTransaction,
		createSubscriber,
		deleteOneSubcriber,
		findPlanByName,
		findSubscriberByEmail,
		getSomeSubcribers,
		getSubscriberCount,
		selectPromotionDetails,
		updateOneSubscriber,
		updatePromotionUsage
	} } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;
	const moment = app.get("moment");

	return {
		// CREATES SUBSCRIBER RECORD
		create: async (req, res, done) => {
			if (!req.body) return sendError('Missing subscriber creation parameters', res, done);

			const {
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
				const plan = await db.oneOrNone(findPlanByName(), [req.session.id, selectedPlan])
				if (!plan) return sendError('Unable to locate the selected plan.', res, done);
				let { amount } = plan;
				let price = parseFloat(amount);

				const existingUser = await db.oneOrNone(findSubscriberByEmail(), [contactEmail, selectedPlan]);
				if (existingUser) return sendError(`Can't create duplicate subscribers within the same plan. The provided email: ${contactEmail}, is already associated with the following plan: ${existingUser.planname}.`, res, done);

				if (promoCode) {
					try {
						const promotional = await db.oneOrNone(selectPromotionDetails(), [req.session.id, promoCode, [selectedPlan]]);
						let { maxusage, totalusage } = promotional;
						maxusage = parseInt(maxusage);
						totalusage = parseInt(totalusage);

						if (totalusage === maxusage) return sendError('This promotional has reached its max amount of usage and is no longer valid. Please try another code instead.', res, done);

						if (promotional) {
							const discount = parseFloat(promotional.amount);
							price = (promotional.discounttype === '%') ? price - (price * (discount/100)) : (price-discount)

							if (price < 0) return sendError('Invalid promotional. Applying that discount to this plan would result in a negative transaction. Please notify the subscription provider immediately.', res, done)
						}

						await db.none(updatePromotionUsage(), [req.session.id, promoCode, [selectedPlan]])
					} catch (err) { return sendError(err, res, done); }
				}

				const tax = parseFloat(((price - price * .925).toFixed(2)))
				const chargeAmount = parseFloat(((price + tax).toFixed(2)));

				await db.none(createTransaction(), [req.session.id, 'paid', selectedPlan, subscriber, 'Stripe', chargeAmount, startDate])

				await db.none(createSubscriber(), [req.session.id, subscriber, amount, billingAddress, billingCity, billingState, billingUnit, billingZip, contactEmail, contactAddress, contactCity, contactPhone, contactState, contactUnit, contactZip, promoCode, sameBillingAddress, selectedPlan, startDate]);

				res.status(201).json({ message: `Succesfully added ${subscriber} to the ${selectedPlan} plan` });
			} catch (err) { return sendError(err, res, done); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, done) => {
			if (!req.query.planname || !req.query.subscriberid) return sendError('Missing subscriber delete parameters', res, done);
			const { planname, subscriberid } = req.query;

			try {
				const name = await db.result(deleteOneSubcriber(), [req.session.id, subscriberid, planname]);

				res.status(201).json({ message: `Succesfully deleted ${name.rows[0].subscriber} from the '${name.rows[0].planname}' plan.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES done SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, done) => {
			if (!req.query) return sendError('Missing query fetch parameters', res, done);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];

			try {
				let activesubscribers, inactivesubscribers;
				const subscribers = await db.any(getSomeSubcribers(req.session.id, limit, offset, status));

				(table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;

				res.status(201).json({ activesubscribers, inactivesubscribers });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, done) => {
			try {
				const subscribers = await db.any(getSubscriberCount(), [req.session.id]);

				res.status(201).json({
					activesubscriberscount: parseStringToNum(subscribers[0].active),
					inactivesubscriberscount: parseStringToNum(subscribers[0].inactive)
				});
			} catch (err) { return sendError(err, res, done); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, done) => {
			try {
				const activesubscribers = await db.any(getSomeSubcribers(req.session.id, 10, 0, ['active']));
				const inactivesubscribers = await db.any(getSomeSubcribers(req.session.id, 10, 0, ['inactive', 'suspended']));

				res.status(201).json({ activesubscribers, inactivesubscribers });
			} catch (err) { return sendError(err, res, done); }
		},
		// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		updateOne: async (req, res, done) => {
			if (!req.body || !req.params.id) return sendError('Missing subscriber update parameters', res, done);
			const { id } = req.params;
			const { updateType, statusType } = req.body;
			const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;

			try {
				const name = await db.one(updateOneSubscriber(), [statusType, endDate, id, req.session.id])

				res.status(201).json({ message: `Succesfully ${updateType} ${name.subscriber}.` });
			} catch (err) { return sendError(err, res, done); }
		}
	}
}

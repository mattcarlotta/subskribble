module.exports = app => {
	const { db, query: { createNotification, createTransaction, createSubscriber, deleteOneSubcriber, findPlanByName, findSubscriberByEmail, getSomeSubcribers, getSubscriberCount, selectPromotionDetails, updateOneSubscriber, updatePromotionUsage }} = app.database;
	const { currentDate, parseStringToFloat, parseStringToNum, sendError } = app.shared.helpers;
	const { duplicateSub, invalidPromo, maxPromoUsage, missingCreationParams, missingDeletionParams, missingQueryParams, missingUpdateParams, unableToLocate } = app.shared.errors;

	return {
		// CREATES SUBSCRIBER RECORD
		create: async (req, res, done) => {
			if (!req.body) return sendError(missingCreationParams, res, done);

			const { billingAddress, billingCity, billingState, billingUnit, billingZip, contactEmail, contactAddress, contactCity, contactPhone, contactState, contactUnit, contactZip, creditCard, creditCardExpMonth, creditCardExpYear, creditCardCVV, promoCode, sameBillingAddress, selectedPlan, subscriber } = req.body;
			const date = currentDate();

			try {
				await db.task('create-subscriber', async dbtask => {
					const plan = await dbtask.oneOrNone(findPlanByName, [req.session.id, selectedPlan])
					if (!plan) return sendError(unableToLocate('plan'), res, done);
					let { amount } = plan;
					let price = parseStringToFloat(amount);

					const existingUser = await dbtask.oneOrNone(findSubscriberByEmail, [contactEmail, selectedPlan]);
					if (existingUser) return sendError(duplicateSub(contactEmail, existingUser.planname), res, done);

					if (promoCode) {
						const promotional = await dbtask.oneOrNone(selectPromotionDetails, [req.session.id, promoCode, [selectedPlan]], date);

						if (promotional) {
							let { maxusage, totalusage } = promotional;
							maxusage = parseStringToNum(maxusage);
							totalusage = parseStringToNum(totalusage);
							if (totalusage === maxusage) return sendError(maxPromoUsage, res, done);

							const discount = parseStringToFloat(promotional.amount);
							price = (promotional.discounttype === '%') ? price - (price * (discount/100)) : (price-discount)
							if (price < 0) return sendError(invalidPromo, res, done)

							await dbtask.none(updatePromotionUsage, [req.session.id, promoCode, [selectedPlan]])
						}
					}

					const tax = parseStringToFloat(((price - price * .925).toFixed(2)));
					const chargeAmount = parseStringToFloat(((price + tax).toFixed(2)));

					await dbtask.none(createTransaction, [req.session.id, 'paid', selectedPlan, contactEmail, subscriber, 'Stripe', chargeAmount, date])

					await dbtask.none(createSubscriber, [req.session.id, subscriber, amount, billingAddress, billingCity, billingState, billingUnit, billingZip, contactEmail, contactAddress, contactCity, contactPhone, contactState, contactUnit, contactZip, promoCode, sameBillingAddress, selectedPlan, date]);

					await dbtask.none(createNotification, [req.session.id, 'people_outline', `${subscriber} has been added to the '${selectedPlan}' plan.`, date]);

					await dbtask.none(createNotification, [req.session.id, 'payment', `${subscriber} has been charged $${chargeAmount} for their '${selectedPlan}' membership!`, date]);

					res.status(201).send(null);
				})
			} catch (err) { return sendError(err, res, done); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, done) => {
			if (!req.query) return sendError(missingDeletionParams, res, done);
			const { planname, subscriberid } = req.query;
			const date = currentDate();

			try {
				await db.task('delete-subscriber', async dbtask => {
					const name = await dbtask.result(deleteOneSubcriber, [req.session.id, subscriberid, planname]);

					await dbtask.none(createNotification, [req.session.id, 'people_outline', `${name.rows[0].subscriber} has been removed from the '${name.rows[0].planname}' plan.`, date])

					res.status(201).send(null);
				})
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES done SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, done) => {
			if (!req.query) return sendError(missingQueryParams, res, done);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];

			try {
				let activesubscribers, inactivesubscribers;
				const subscribers = await db.any(getSomeSubcribers(req.session.id, limit, offset, status));

				(table === "activesubscribers")
					? activesubscribers = subscribers
					: inactivesubscribers = subscribers

				res.status(201).json({ activesubscribers, inactivesubscribers });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, done) => {
			try {
				const subscribers = await db.any(getSubscriberCount, [req.session.id]);

				res.status(201).json({
					activesubscriberscount: parseStringToNum(subscribers[0].active),
					inactivesubscriberscount: parseStringToNum(subscribers[0].inactive)
				});
			} catch (err) { return sendError(err, res, done); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, done) => {
										console.log("req.session.id", req.session.id)
			try {
				await db.task('fetch-subscriber-index', async dbtask => {
					const activesubscribers = await dbtask.any(getSomeSubcribers(req.session.id, 10, 0, ['active']));
					const inactivesubscribers = await dbtask.any(getSomeSubcribers(req.session.id, 10, 0, ['inactive', 'suspended']));

					res.status(201).json({ activesubscribers, inactivesubscribers });
				})
			} catch (err) { return sendError(err, res, done); }
		},
		// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		updateStatus: async (req, res, done) => {
			if (!req.body || !req.params.id) return sendError(missingUpdateParams, res, done);
			const { updateType, statusType } = req.body;
			const date = currentDate();
			const endDate = updateType === 'suspended' ? date : null;

			try {
				await db.task('update-subscriber-status', async dbtask => {
					const name = await dbtask.one(updateOneSubscriber, [req.session.id, req.params.id, statusType, endDate])

					const message = updateType === 'suspended' ? 'suspended from' : 'reactivated and added to'

					await dbtask.none(createNotification, [req.session.id, 'people_outline', `${name.subscriber} has been ${message} the following plan: ${name.planname}.`, date])

					res.status(201).send(null);
				})
			} catch (err) { return sendError(err, res, done); }
		}
	}
}

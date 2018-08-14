module.exports = app => {
	const { db, query: { createPlan, createSubscriber, deletePlanByName, selectPlan, updatePlanSubCount } } = app.database;
	const { sendError } = app.shared.helpers;
	const moment = app.get("moment");

	const planControllers = {
		// CREATES PLAN RECORD
		createPlan: async (req, res, done) => {
			try {
				await db.none(createPlan(), [req.session.id, 'Fake Plan', 0.99])
				res.status(201).json({ message: `Succesfully added 'Fake Plan' to your plans list!`})
			} catch (err) { return sendError(err, res, done); }
		},
		// DELETES PLAN RECORD
		deletePlan: async (req, res, done) => {
			try {
				const name = await db.result(deletePlanByName(), [req.session.id, 'Fake Plan']);

				res.status(201).json({ message: `Succesfully deleted '${name.rows[0].planname}' plan.` });
			} catch (err) { return sendError(err, res, done); }
		},
	}

	const subscriberControllers = {
		// CREATES SUBSCRIBER RECORD AND UPDATES PLAN SUBSCRIBER COUNT
		createSubscriber: async (req, res, done) => {
			try {
				const subscriber = 'Fake Subscriber';
				const selectedPlan = 'Fake Plan';
				const planExists = await db.oneOrNone(selectPlan(), [req.session.id, 'Fake Plan']);
				if (!planExists) return sendError('You must create a plan before adding a subscriber!', res, done);

				await db.none(createSubscriber(), [req.session.id, subscriber, "555 Fake Lane", "Fake City", "Fake State", "55555", "fake@email.com", "(555)555-555", selectedPlan]);
				await db.none(updatePlanSubCount(), [req.session.id, selectedPlan]);

				res.status(201).json({ message: `Succesfully added ${subscriber} to the ${selectedPlan} plan.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// // DELETES REQURESTED RECORD
		// deleteOne: async (req, res, done) => {
		//   if (!req.params.id) return sendError('Missing subscriber delete parameters', res, done);
		//
		//   try {
		//     const name = await db.result(deleteOneSubcriber(), [req.params.id, req.session.id]);
		//
		//     res.status(201).json({ message: `Succesfully deleted ${name.rows[0].subscriber} from the ${name.rows[0].plan} plan.` });
		//   } catch (err) { return sendError(err, res, done); }
		// },
		// // FETCHES done SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		// fetchRecords: async (req, res, done) => {
		//   if (!req.query) return sendError('Missing query fetch parameters', res, done);
		//
		//   let { table, limit, page } = req.query;
		//   limit = parseStringToNum(limit);
		//   const offset =  parseStringToNum(page) * limit;
		//   const status = table === 'activesubscribers' ? ['active'] : ['inactive', 'suspended'];
		//
		//   try {
		//     let activesubscribers, inactivesubscribers;
		//     const subscribers = await db.any(getSomeSubcribers(req.session.id, limit, offset, status));
		//
		//     (table === "activesubscribers") ? activesubscribers = subscribers : inactivesubscribers = subscribers;
		//
		//     res.status(201).json({ activesubscribers, inactivesubscribers });
		//   } catch (err) { return sendError(err, res, done); }
		// },
		// // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		// fetchCounts: async (req, res, done) => {
		//   try {
		//     const subscribers = await db.any(getSubscriberCount(), [req.session.id]);
		//
		//     res.status(201).json({
		//       activesubscriberscount: parseStringToNum(subscribers[0].active),
		//       inactivesubscriberscount: parseStringToNum(subscribers[0].inactive)
		//     });
		//   } catch (err) { return sendError(err, res, done); }
		// },
		// // SENDS FIRST 10 RECORDS
		// index: async (req, res, done) => {
		//   try {
		//     const activesubscribers = await db.any(getSomeSubcribers(req.session.id, 10, 0, ['active']));
		//     const inactivesubscribers = await db.any(getSomeSubcribers(req.session.id, 10, 0, ['inactive', 'suspended']));
		//
		//     res.status(201).json({ activesubscribers, inactivesubscribers });
		//   } catch (err) { return sendError(err, res, done); }
		// },
		// // UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		// updateOne: async (req, res, done) => {
		//   if (!req.body || !req.params.id) return sendError('Missing subscriber update parameters', res, done);
		//   const { id } = req.params;
		//   const { updateType, statusType } = req.body;
		//   const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;
		//
		//   try {
		//     const name = await db.one(updateOneSubscriber(), [statusType, endDate, id, req.session.id])
		//
		//     res.status(201).json({ message: `Succesfully ${updateType} ${name.subscriber}.` });
		//   } catch (err) { return sendError(err, res, done); }
		// }
	}

	return {
		...planControllers,
		...subscriberControllers,
	}
}

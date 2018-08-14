const isEmpty = require('lodash').isEmpty;

module.exports = app => {
	const { db, query: { createPlan, deleteOnePlan, findPlanById, getAllActivePlans, getAllPlans, getPlanCount, updatePlan, updatePlanStatus, selectPlan } } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;

	return {
		// CREATES A PLAN PER CLIENT-SIDE REQUEST
		create: async (req, res, done) => {
			if (!req.body) return sendError('Missing plan creation parameters.', res, done);
			const { amount, billevery, planname, description, setupfee } = req.body;

			try {
				const planExists = await db.oneOrNone(selectPlan(), [req.session.id, planname])
				if (planExists) return sendError('A plan with that name already exists. Please use another name.', res, done);

				await db.result(createPlan(), [req.session.id, amount, billevery, planname, description, setupfee]);

				res.status(201).json({ message: `Succesfully created a '${planname}' plan.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, done) => {
			if (!req.params.id) return sendError('Missing plan delete parameters.', res, done);

			try {
				const name = await db.result(deleteOnePlan(), [req.session.id, req.params.id]);

				res.status(201).json({ message: `Succesfully deleted '${name.rows[0].planname}' plan.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchAllActiveRecords: async (req, res, done) => {
			if (!req.query) return sendError('Missing query fetch parameters.', res, done);
			try {
				const activeplans = await db.any(getAllActivePlans(), [req.session.id]);
				if (isEmpty(activeplans)) return sendError('You must create a plan first!', res, done);

				res.status(201).json({ activeplans });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords:  async (req, res, done) => {
			if (!req.query) return sendError('Missing query fetch parameters.', res, done);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activeplans' ? 'active' : 'suspended';

			try {
				let activeplans, inactiveplans;
				const plans = await db.any(getAllPlans(req.session.id, limit, offset, status));

				(table === "activeplans") ? activeplans = plans : inactiveplans = plans;

				res.status(201).json({ activeplans, inactiveplans });
			} catch (err) { return sendError(err, res, done); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, done) => {
			try {
				const plans = await db.any(getPlanCount(), [req.session.id]);

				res.status(201).json({
					activeplancount: parseStringToNum(plans[0].active),
					inactiveplancount: parseStringToNum(plans[0].inactive)
				});
			} catch (err) { return sendError(err, res, done); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, done) => {
			try {
				const activeplans = await db.any(getAllPlans(req.session.id, 10, 0, 'active'));
				const inactiveplans = await db.any(getAllPlans(req.session.id, 10, 0, 'suspended'));

				res.status(201).json({ activeplans, inactiveplans });
			} catch (err) { return sendError(err, res, done); }
		},
		// UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
		updateOne: async (req, res, done) => {
			if (!req.body || !req.params.id) return sendError('Missing promotional creation parameters.', res, done);
			let { amount, billevery, planname, description, setupfee, trialperiod } = req.body;
			trialperiod = trialperiod === '(none)' ? undefined : trialperiod
			setupfee = setupfee === '' ? undefined : setupfee

			try {
				await db.none(updatePlan(), [req.session.id, req.params.id, amount, billevery, planname, description, setupfee, trialperiod]);

				res.status(201).json({ message: `Succesfully updated plan: ${planname}` });
			} catch (err) { return sendError(err, res, done); }
		},
		// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		updateStatus: async (req, res, done) => {
			if (!req.body || !req.params.id) return sendError('Missing plan update parameters', res, done);

			const { id } = req.params;
			const { updateType, statusType } = req.body;

			try {
				const name = await db.one(updatePlanStatus(), [statusType, id, req.session.id])

				res.status(201).json({ message: `Succesfully ${updateType} '${name.planname}' plan.` });
			} catch (err) { return sendError(err, res, done); }
		},
		// SELECTS A SINGLE RECORD
		selectOne: async (req, res, done) => {
			if (!req.query) return sendError('Missing plan select parameters.', res, done);

			try {
				const plan = await db.oneOrNone(findPlanById(), [req.session.id, req.query.id]);
				if (!plan) return sendError("Unable to locate the plan.", res, done);

				res.status(201).json({ ...plan });
			} catch (err) { return sendError(err, res, done); }
		}
	}
}

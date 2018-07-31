const isEmpty = require('lodash').isEmpty;

module.exports = app => {
	const { db, query: { createPlan, deleteOnePlan, findPlanById, getAllActivePlans, getAllPlans, getPlanCount, updatePlan, updatePlanStatus, selectPlan } } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;

	return {
		// CREATES A PLAN PER CLIENT-SIDE REQUEST
		create: async (req, res, next) => {
			if (!req.body) return sendError('Missing plan creation parameters.', res, next);
			const { amount, billevery, planname, description, setupfee } = req.body;

			try {
				const planExists = await db.oneOrNone(selectPlan(), [req.session.id, planname])
				if (planExists) return sendError('A plan with that name already exists. Please use another name.', res, next);

				await db.result(createPlan(), [req.session.id, amount, billevery, planname, description, setupfee]);

				res.status(201).json({ message: `Succesfully created a '${planname}' plan.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, next) => {
			if (!req.params.id) return sendError('Missing plan delete parameters.', res, next);

			try {
				const name = await db.result(deleteOnePlan(), [req.session.id, req.params.id]);

				res.status(201).json({ message: `Succesfully deleted '${name.rows[0].planname}' plan.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchAllActiveRecords: async (req, res, next) => {
			if (!req.query) return sendError('Missing query fetch parameters.', res, next);
			try {
				const activeplans = await db.any(getAllActivePlans(), [req.session.id]);
				if (isEmpty(activeplans)) return sendError('You must create a plan first!', res, next);

				res.status(201).json({ activeplans });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords:  async (req, res, next) => {
			if (!req.query) return sendError('Missing query fetch parameters.', res, next);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activeplans' ? 'active' : 'suspended';

			try {
				let activeplans, inactiveplans;
				const plans = await db.any(getAllPlans(req.session.id, limit, offset, status));

				(table === "activeplans") ? activeplans = plans : inactiveplans = plans;

				res.status(201).json({ activeplans, inactiveplans });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, next) => {
			try {
				const plans = await db.any(getPlanCount(), [req.session.id]);

				res.status(201).json({
					activeplancount: parseStringToNum(plans[0].active),
					inactiveplancount: parseStringToNum(plans[0].inactive)
				});
			} catch (err) { return sendError(err, res, next); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, next) => {
			try {
				const activeplans = await db.any(getAllPlans(req.session.id, 10, 0, 'active'));
				const inactiveplans = await db.any(getAllPlans(req.session.id, 10, 0, 'suspended'));

				res.status(201).json({ activeplans, inactiveplans });
			} catch (err) { return sendError(err, res, next); }
		},
		// UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
		updateOne: async (req, res, next) => {
			if (!req.body || !req.params.id) return sendError('Missing promotional creation parameters.', res, next);
			let { amount, billevery, planname, description, setupfee, trialperiod } = req.body;
			trialperiod = trialperiod === '(none)' ? undefined : trialperiod
			setupfee = setupfee === '' ? undefined : setupfee

			try {
				await db.none(updatePlan(), [req.session.id, req.params.id, amount, billevery, planname, description, setupfee, trialperiod]);

				res.status(201).json({ message: `Succesfully updated plan: ${planname}` });
			} catch (err) { return sendError(err, res, next); }
		},
		// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
		updateStatus: async (req, res, next) => {
			if (!req.body || !req.params.id) return sendError('Missing plan update parameters', res, next);

			const { id } = req.params;
			const { updateType, statusType } = req.body;

			try {
				const name = await db.one(updatePlanStatus(), [statusType, id, req.session.id])

				res.status(201).json({ message: `Succesfully ${updateType} '${name.planname}' plan.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// SELECTS A SINGLE RECORD
		selectOne: async (req, res, next) => {
			if (!req.query) return sendError('Missing plan select parameters.', res, next);

			try {
				const plan = await db.oneOrNone(findPlanById(), [req.session.id, req.query.id]);
				if (!plan) return sendError("Unable to locate the plan.", res, next);

				res.status(201).json({ ...plan });
			} catch (err) { return sendError(err, res, next); }
		}
	}
}

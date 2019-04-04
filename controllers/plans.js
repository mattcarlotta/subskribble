const { isEmpty } = require('lodash');
const db = require('../database/db');
const {
  createNotification,
  createPlan,
  deleteOnePlan,
  findPlanById,
  getAllActivePlans,
  getAllPlans,
  getPlanCount,
  updatePlan,
  updatePlanStatus,
  selectPlan,
} = require('../database/query');
const {
  currentDate,
  parseStringToNum,
  sendError,
} = require('../shared/helpers');
const {
  createPlanFirst,
  itemAlreadyExists,
  missingCreationParams,
  missingDeletionParams,
  missingQueryParams,
  missingSelectParams,
  missingUpdateParams,
  unableToLocate,
} = require('../shared/errors');

module.exports = {
  // CREATES A PLAN PER CLIENT-SIDE REQUEST
  create: async (req, res, done) => {
    if (!req.body) return sendError(missingCreationParams, res, done);
    const {
      amount, billevery, planname, description, setupfee,
    } = req.body;
    const date = currentDate();

    try {
      await db.task('create-plan', async (dbtask) => {
        const planExists = await dbtask.oneOrNone(selectPlan, [
          req.session.id,
          planname,
        ]);
        if (planExists) return sendError(itemAlreadyExists('plan'), res, done);

        await dbtask.result(createPlan, [
          req.session.id,
          amount,
          billevery,
          planname,
          description,
          setupfee,
          date,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'content_paste',
          `A new plan: ${planname}, billed at $${amount}/${billevery}, has been created.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // DELETES REQURESTED RECORD
  deleteOne: async (req, res, done) => {
    if (!req.params.id) return sendError(missingDeletionParams, res, done);
    const date = currentDate();

    try {
      await db.task('delete-plan', async (dbtask) => {
        const name = await dbtask.result(deleteOnePlan, [
          req.session.id,
          req.params.id,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'content_paste',
          `The following plan: ${name.rows[0].planname}, has been deleted.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
  fetchAllActiveRecords: async (req, res, done) => {
    if (!req.query) return sendError(missingQueryParams, res, done);
    try {
      const activeplans = await db.any(getAllActivePlans, [req.session.id]);
      if (isEmpty(activeplans)) return sendError(createPlanFirst, res, done);

      res.status(201).json({ activeplans });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
  fetchRecords: async (req, res, done) => {
    if (!req.query) return sendError(missingQueryParams, res, done);
    const { table, page } = req.query;
    let { limit } = req.query;
    limit = parseStringToNum(limit);
    const offset = parseStringToNum(page) * limit;
    const status = table === 'activeplans' ? 'active' : 'suspended';

    try {
      let activeplans;
      let inactiveplans;
      const plans = await db.any(
        getAllPlans(req.session.id, limit, offset, status),
      );

      if (table === 'activeplans') {
        activeplans = plans;
      } else {
        inactiveplans = plans;
      }

      res.status(201).json({ activeplans, inactiveplans });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
  fetchCounts: async (req, res, done) => {
    try {
      const plans = await db.any(getPlanCount, [req.session.id]);

      res.status(201).json({
        activeplancount: parseStringToNum(plans[0].active),
        inactiveplancount: parseStringToNum(plans[0].inactive),
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // SENDS FIRST 10 RECORDS
  index: async (req, res, done) => {
    try {
      await db.task('fetch-index-plans', async (dbtask) => {
        const activeplans = await dbtask.any(
          getAllPlans(req.session.id, 10, 0, 'active'),
        );
        const inactiveplans = await dbtask.any(
          getAllPlans(req.session.id, 10, 0, 'suspended'),
        );

        res.status(201).json({ activeplans, inactiveplans });
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
  updateOne: async (req, res, done) => {
    if (!req.body || !req.params.id) return sendError(missingUpdateParams, res, done);

    const {
      amount, billevery, planname, description,
    } = req.body;
    let { setupfee, trialperiod } = req.body;
    trialperiod = trialperiod === '(none)' ? undefined : trialperiod;
    setupfee = setupfee === '' ? undefined : setupfee;
    const date = currentDate();

    try {
      await db.task('update-plan-record', async (dbtask) => {
        await dbtask.none(updatePlan, [
          req.session.id,
          req.params.id,
          amount,
          billevery,
          planname,
          description,
          setupfee,
          trialperiod,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'content_paste',
          `The following plan: ${planname}, has been successfully edited and updated.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
  updateStatus: async (req, res, done) => {
    if (!req.body || !req.params.id) return sendError(missingUpdateParams, res, done);
    const { updateType, statusType } = req.body;
    const date = currentDate();

    try {
      await db.task('update-plan-status', async (dbtask) => {
        const name = await dbtask.one(updatePlanStatus, [
          req.session.id,
          req.params.id,
          statusType,
        ]);

        const message = updateType === 'activated' ? 'reactivated' : 'suspended';
        await dbtask.none(createNotification, [
          req.session.id,
          'content_paste',
          `The following plan: ${name.planname}, has been ${message}.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // SELECTS A SINGLE RECORD
  selectOne: async (req, res, done) => {
    if (!req.query) return sendError(missingSelectParams, res, done);

    try {
      const plan = await db.oneOrNone(findPlanById, [
        req.session.id,
        req.query.id,
      ]);
      if (!plan) return sendError(unableToLocate('plan'), res, done);

      res.status(201).json({ ...plan });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
};

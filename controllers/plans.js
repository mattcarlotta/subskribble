import isEmpty from "lodash/isEmpty";
import db from "db";
import {
  createNotification,
  createPlan,
  deleteOnePlan,
  findPlanById,
  findPlanByName,
  getAllActivePlans,
  getAllPlans,
  getPlanCount,
  updatePlan,
  updatePlanStatus,
} from "queries";
import { currentDate, parseStringToNum, sendError } from "helpers";
import {
  createPlanFirst,
  itemAlreadyExists,
  missingCreationParams,
  missingDeletionParams,
  missingQueryParams,
  missingSelectParams,
  missingUpdateParams,
  unableToLocate,
} from "errors";

// CREATES A PLAN PER CLIENT-SIDE REQUEST
const create = async (req, res, done) => {
  const {
    amount,
    billevery,
    planname,
    description,
    setupfee,
    trialperiod,
  } = req.body;

  if (!amount || !billevery || !planname || !description) return sendError(missingCreationParams, res, done);

  const date = currentDate();

  try {
    await db.task("create-plan", async (dbtask) => {
      const planExists = await dbtask.oneOrNone(findPlanByName, [
        req.session.id,
        planname,
      ]);
      if (!isEmpty(planExists)) return sendError(itemAlreadyExists("plan"), res, done);

      await dbtask.result(createPlan, [
        req.session.id,
        amount,
        billevery,
        planname,
        description,
        setupfee,
        trialperiod,
        date,
      ]);

      await dbtask.none(createNotification, [
        req.session.id,
        "content_paste",
        `A new plan: ${planname}, billed at $${amount}/${billevery}, has been created.`,
        date,
      ]);

      res.status(201).send(null);
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// DELETES REQURESTED RECORD
const deleteOne = async (req, res, done) => {
  const { id } = req.params;
  if (!id || id === "null") return sendError(missingDeletionParams, res, done);
  const date = currentDate();

  try {
    await db.task("delete-plan", async (dbtask) => {
      const planExists = await dbtask.oneOrNone(findPlanById, [
        req.session.id,
        id,
      ]);
      if (!planExists) return sendError(unableToLocate("plan"), res, done);

      const name = await dbtask.result(deleteOnePlan, [req.session.id, id]);

      await dbtask.none(createNotification, [
        req.session.id,
        "content_paste",
        `The following plan: ${name.rows[0].planname}, has been deleted.`,
        date,
      ]);

      res.status(201).send(null);
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
const fetchAllActiveRecords = async (req, res, done) => {
  try {
    const activeplans = await db.any(getAllActivePlans, [req.session.id]);
    if (isEmpty(activeplans)) return sendError(createPlanFirst, res, done);

    res.status(201).json({ activeplans });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
const fetchRecords = async (req, res, done) => {
  const { table, page } = req.query;
  let { limit } = req.query;
  if (!table || !page || !limit) return sendError(missingQueryParams, res, done);

  limit = parseStringToNum(limit);
  const offset = parseStringToNum(page) * limit;
  const status = table === "activeplans" ? "active" : "suspended";

  try {
    let activeplans;
    let inactiveplans;
    const plans = await db.any(
      getAllPlans(req.session.id, limit, offset, status),
    );

    if (table === "activeplans") {
      activeplans = plans;
    } else {
      inactiveplans = plans;
    }

    res.status(201).json({ activeplans, inactiveplans });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
const fetchCounts = async (req, res, done) => {
  try {
    const plans = await db.any(getPlanCount, [req.session.id]);

    res.status(201).json({
      activeplancount: parseStringToNum(plans[0].active),
      inactiveplancount: parseStringToNum(plans[0].inactive),
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// SENDS FIRST 10 RECORDS
const index = async (req, res, done) => {
  try {
    await db.task("fetch-index-plans", async (dbtask) => {
      const activeplans = await dbtask.any(
        getAllPlans(req.session.id, 10, 0, "active"),
      );
      const inactiveplans = await dbtask.any(
        getAllPlans(req.session.id, 10, 0, "suspended"),
      );

      res.status(201).json({ activeplans, inactiveplans });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
const updateOne = async (req, res, done) => {
  const { id } = req.params;
  const {
    amount, billevery, planname, description,
  } = req.body;
  let { setupfee, trialperiod } = req.body;

  if (
    !amount
    || !billevery
    || !planname
    || !description
    || !id
    || id === "null"
  ) return sendError(missingUpdateParams, res, done);

  trialperiod = trialperiod === "(none)" ? undefined : trialperiod;
  setupfee = setupfee === "" ? undefined : setupfee;
  const date = currentDate();

  try {
    await db.task("update-plan-record", async (dbtask) => {
      const planExists = await dbtask.oneOrNone(findPlanById, [
        req.session.id,
        id,
      ]);
      if (!planExists) return sendError(unableToLocate("plan"), res, done);

      await dbtask.none(updatePlan, [
        req.session.id,
        id,
        amount,
        billevery,
        planname,
        description,
        setupfee,
        trialperiod,
      ]);

      await dbtask.none(createNotification, [
        req.session.id,
        "content_paste",
        `The following plan: ${planname}, has been successfully edited and updated.`,
        date,
      ]);

      res.status(201).send(null);
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
const updateStatus = async (req, res, done) => {
  const { id } = req.params;
  const { updateType, statusType } = req.body;

  if (!updateType || !statusType || !id || id === "null") return sendError(missingUpdateParams, res, done);

  const date = currentDate();

  try {
    await db.task("update-plan-status", async (dbtask) => {
      const planExists = await dbtask.oneOrNone(findPlanById, [
        req.session.id,
        id,
      ]);
      if (!planExists) return sendError(unableToLocate("plan"), res, done);

      const name = await dbtask.one(updatePlanStatus, [
        req.session.id,
        id,
        statusType,
      ]);

      const message = updateType === "activated" ? "reactivated" : "suspended";
      await dbtask.none(createNotification, [
        req.session.id,
        "content_paste",
        `The following plan: ${name.planname}, has been ${message}.`,
        date,
      ]);

      res.status(201).send(null);
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// SELECTS A SINGLE RECORD
const selectOne = async (req, res, done) => {
  const { id } = req.query;
  if (!id || id === "null") return sendError(missingSelectParams, res, done);

  try {
    const plan = await db.oneOrNone(findPlanById, [req.session.id, id]);
    if (!plan) return sendError(unableToLocate("plan"), res, done);

    res.status(201).json({ ...plan });
  } catch (err) {
    return sendError(err, res, done);
  }
};

export {
  create,
  deleteOne,
  fetchAllActiveRecords,
  fetchRecords,
  fetchCounts,
  index,
  updateOne,
  updateStatus,
  selectOne,
};

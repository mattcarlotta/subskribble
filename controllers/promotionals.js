import isEmpty from "lodash/isEmpty";
import db from "db";
import {
  createNotification,
  createPromotion,
  deleteOnePromotion,
  findPromoById,
  getAllPromotions,
  getPromotionCount,
  updatePromotion,
  updatePromotionStatus,
  selectPromotionCode,
  selectPromotionDetails,
} from "queries";
import {
  currentDate,
  convertDateToISO,
  parseStringToNum,
  sendError,
} from "helpers";
import {
  invalidPromo,
  itemAlreadyExists,
  missingCreationParams,
  missingDeletionParams,
  missingQueryParams,
  missingSelectParams,
  missingUpdateParams,
  unableToLocate,
} from "errors";

// LOOKS UP PROMOCODE PER CLIENT-SIDE REQUEST
const apply = async (req, res, done) => {
  const { promocode, plan } = req.query;

  if (!promocode || !plan) return sendError(missingSelectParams, res, done);
  const date = currentDate();

  try {
    const promotional = await db.oneOrNone(selectPromotionDetails, [
      req.session.id,
      promocode,
      [plan],
      date,
    ]);
    if (!promotional) return sendError(invalidPromo, res, done);

    res.status(201).json({ promotional });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// CREATES PROMO RECORD
const create = async (req, res, done) => {
  const {
    amount,
    discounttype,
    enddate,
    promocode,
    plans,
    maxusage,
    startdate,
  } = req.body;

  if (
    !amount
    || !discounttype
    || !enddate
    || !promocode
    || isEmpty(plans)
    || !startdate
  ) return sendError(missingCreationParams, res, done);

  const allowedUsage = maxusage ? parseStringToNum(maxusage) : 2147483647;
  const startDateISO = convertDateToISO(startdate);
  const endDateISO = convertDateToISO(enddate);
  const date = currentDate();

  try {
    await db.task("create-promo", async (dbtask) => {
      const promoExists = await dbtask.oneOrNone(selectPromotionCode, [
        req.session.id,
        promocode,
      ]);
      if (promoExists) return sendError(itemAlreadyExists("promotional"), res, done);

      await dbtask.none(createPromotion, [
        req.session.id,
        amount,
        allowedUsage,
        discounttype,
        endDateISO,
        promocode,
        plans,
        startDateISO,
      ]);

      await dbtask.none(createNotification, [
        req.session.id,
        "new_releases",
        `A new promotional: ${promocode}, has been added to the following ${
          plans.length > 1 ? "plans" : "plan"
        }: ${plans}.`,
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
    await db.task("delete-promo", async (dbtask) => {
      const promoExists = await dbtask.oneOrNone(findPromoById, [
        req.session.id,
        id,
      ]);
      if (!promoExists) return sendError(unableToLocate("promotional"), res, done);

      const name = await dbtask.result(deleteOnePromotion, [
        req.session.id,
        id,
      ]);

      await dbtask.none(createNotification, [
        req.session.id,
        "new_releases",
        `The following promotional: ${
          name.rows[0].promocode
        }, has been deleted.`,
        date,
      ]);

      res.status(201).send(null);
    });
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
  const status = table === "activepromotionals" ? "active" : "suspended";

  try {
    let activepromos;
    let inactivepromos;
    const promos = await db.any(
      getAllPromotions(req.session.id, limit, offset, status),
    );

    if (table === "activepromotionals") {
      activepromos = promos;
    } else {
      inactivepromos = promos;
    }

    res.status(201).json({ activepromos, inactivepromos });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
const fetchCounts = async (req, res, done) => {
  try {
    const promos = await db.any(getPromotionCount, [req.session.id]);
    if (isEmpty(promos)) return sendError("Unable to fetch promotional counts", res, done);

    res.status(201).json({
      activepromocount: parseStringToNum(promos[0].active),
      inactivepromocount: parseStringToNum(promos[0].inactive),
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// SENDS FIRST 10 RECORDS
const index = async (req, res, done) => {
  try {
    await db.task("fetch-index-promos", async (dbtask) => {
      const activepromos = await dbtask.any(
        getAllPromotions(req.session.id, 10, 0, "active"),
      );
      const inactivepromos = await dbtask.any(
        getAllPromotions(req.session.id, 10, 0, "suspended"),
      );

      res.status(201).json({ activepromos, inactivepromos });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
const updateOne = async (req, res, done) => {
  const { id } = req.params;

  const {
    amount,
    discounttype,
    enddate,
    promocode,
    plans,
    maxusage,
    startdate,
  } = req.body;

  if (
    !amount
    || !discounttype
    || !enddate
    || !promocode
    || isEmpty(plans)
    || !startdate
    || !id
    || id === "null"
  ) return sendError(missingUpdateParams, res, done);

  const allowedUsage = maxusage ? parseStringToNum(maxusage) : 2147483647;
  const startDateISO = convertDateToISO(startdate);
  const endDateISO = convertDateToISO(enddate);
  const date = currentDate();

  try {
    await db.task("update-promo-record", async (dbtask) => {
      const promoExists = await dbtask.oneOrNone(findPromoById, [
        req.session.id,
        id,
      ]);
      if (!promoExists) return sendError(unableToLocate("promotional"), res, done);

      await dbtask.none(updatePromotion, [
        req.session.id,
        id,
        amount,
        allowedUsage,
        discounttype,
        endDateISO,
        promocode,
        plans,
        startDateISO,
      ]);

      await dbtask.none(createNotification, [
        req.session.id,
        "new_releases",
        `The following promotional: ${promocode}, has been successfully edited and updated.`,
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
    await db.task("update-promo-status", async (dbtask) => {
      const promoExists = await dbtask.oneOrNone(findPromoById, [
        req.session.id,
        id,
      ]);
      if (!promoExists) return sendError(unableToLocate("promotional"), res, done);

      const name = await dbtask.one(updatePromotionStatus, [
        req.session.id,
        id,
        statusType,
      ]);

      const message = updateType === "suspended"
        ? "deactivated and is no longer valid for"
        : "reactivated and is now valid for";
      await dbtask.none(createNotification, [
        req.session.id,
        "new_releases",
        `The following promotional: ${
          name.promocode
        }, has been ${message} the following ${
          name.plans.length > 1 ? "plans" : "plan"
        }: ${name.plans}.`,
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
    const promotional = await db.oneOrNone(findPromoById, [req.session.id, id]);
    if (!promotional) return sendError(unableToLocate("promotional"), res, done);

    res.status(201).json({ ...promotional });
  } catch (err) {
    return sendError(err, res, done);
  }
};

export {
  apply,
  create,
  deleteOne,
  fetchRecords,
  fetchCounts,
  index,
  updateOne,
  updateStatus,
  selectOne,
};

import db from 'db';
import {
  createNotification,
  deleteOneTransactaction,
  getSomeTransactactions,
  getTransactionCount,
  getSubscriberId,
  refundTransaction,
  selectTransactionById,
  updateSubscriberCredits,
} from 'queries';
import { currentDate, parseStringToNum, sendError } from 'helpers';
import {
  missingDeletionParams,
  missingQueryParams,
  missingUpdateParams,
  unableToLocate,
} from 'errors';

// DELETES REQURESTED RECORD
const deleteOne = async (req, res, done) => {
  const { id } = req.params;

  if (!id || id === 'null') return sendError(missingDeletionParams, res, done);

  const date = currentDate();

  try {
    await db.task('delete-transaction', async (dbtask) => {
      const name = await dbtask.result(deleteOneTransactaction, [
        req.session.id,
        id,
      ]);

      await dbtask.none(createNotification, [
        req.session.id,
        'payment',
        `The following invoice: ${name.rows[0].invoice}, has been deleted.`,
        date,
      ]);

      res.status(201).json({
        message: `Successfully deleted the ${
          name.rows[0].status
        } transaction from ${name.rows[0].planname}.`,
      });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
const fetchCounts = async (req, res, done) => {
  try {
    const transactions = await db.any(getTransactionCount, [req.session.id]);

    res.status(201).json({
      chargecount: parseStringToNum(transactions[0].charges),
      refundcount: parseStringToNum(transactions[0].refunds),
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// FETCHES A SINGLE RECORD
const fetchOne = async (req, res, done) => {
  const { id } = req.query;

  if (!id || id === 'null') return sendError(missingQueryParams, res, done);

  try {
    const transaction = await db.oneOrNone(selectTransactionById, [
      req.session.id,
      id,
    ]);
    if (!transaction) return sendError(unableToLocate('transaction'), res, done);

    res.status(201).json({ ...transaction });
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
  const status = table === 'charges' ? ['paid', 'due'] : ['refund', 'credit'];

  try {
    let chargetransactions;
    let refundtransactions;
    const charges = await db.any(
      getSomeTransactactions(req.session.id, limit, offset, status),
    );

    if (table === 'charges') {
      chargetransactions = charges;
    } else {
      refundtransactions = charges;
    }

    res.status(201).json({ chargetransactions, refundtransactions });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// SENDS FIRST 10 RECORDS
const index = async (req, res, done) => {
  try {
    await db.task('fetch-transactions-index', async (dbtask) => {
      const chargetransactions = await dbtask.any(
        getSomeTransactactions(req.session.id, 10, 0, ['paid', 'due']),
      );
      const refundtransactions = await dbtask.any(
        getSomeTransactactions(req.session.id, 10, 0, ['refund', 'credit']),
      );

      res.status(201).json({ chargetransactions, refundtransactions });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// REFUNDS OR CREDITS A TRANSACTION
const refundOne = async (req, res, done) => {
  const {
    amount,
    email,
    planname,
    processor,
    subscriber,
    transactiontype,
  } = req.body;

  if (
    !amount
    || !email
    || !planname
    || !processor
    || !subscriber
    || !transactiontype
  ) return sendError(missingUpdateParams, res, done);

  const date = currentDate();

  try {
    await db.task('refund-transaction', async (dbtask) => {
      await dbtask.none(refundTransaction, [
        req.session.id,
        transactiontype,
        planname,
        email,
        subscriber,
        processor,
        amount,
        date,
      ]);

      if (transactiontype === 'credit') {
        const user = await dbtask.oneOrNone(getSubscriberId, [
          req.session.id,
          email,
        ]);
        if (!user) return sendError(unableToLocate('subscriber'), res, done);

        await dbtask.none(updateSubscriberCredits, [
          req.session.id,
          user.id,
          amount,
        ]);
      }

      await dbtask.none(createNotification, [
        req.session.id,
        'payment',
        `The following subscriber: ${subscriber}, has been ${transactiontype}ed the following amount: $${amount}`,
        date,
      ]);

      res.status(201).json({
        message: `Successfully ${transactiontype}ed ${subscriber}.`,
      });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

export {
  deleteOne, fetchCounts, fetchOne, fetchRecords, index, refundOne,
};

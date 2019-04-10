import db from 'db';
import {
  deleteAllNotifications,
  deleteOneNotification,
  getSomeNotifications,
  setReadNotifications,
} from 'queries';
import { missingDeletionParams } from 'errors';
import { sendError } from 'helpers';

// COLLECTS/SENDS ALL NOTIFICATIONS FOR USER
const index = async (req, res, done) => {
  try {
    const noteList = await db.any(getSomeNotifications, [req.session.id]);

    res.status(201).send(...noteList);
  } catch (err) {
    return sendError(err, res, done);
  }
};

// UPDATES ALL NOTIFICATIONS AS READ FOR USER
const updateAll = async (req, res, done) => {
  try {
    await db.oneOrNone(setReadNotifications, [req.session.id]);

    res.status(201).send(null);
  } catch (err) {
    return sendError(err, res, done);
  }
};

// DELETES ONE NOTIFICATION
const deleteOne = async (req, res, done) => {
  const { id } = req.query;

  if (!id || id === 'null') return sendError(missingDeletionParams, res, done);

  try {
    await db.result(deleteOneNotification, [req.session.id, req.query.id]);

    res.status(201).send(null);
  } catch (err) {
    return sendError(err, res, done);
  }
};

// DELETES ALL NOTIFICATIONS
const deleteAll = async (req, res, done) => {
  try {
    await db.result(deleteAllNotifications, [req.session.id]);

    res.status(201).send(null);
  } catch (err) {
    return sendError(err, res, done);
  }
};

export {
  index, updateAll, deleteOne, deleteAll,
};

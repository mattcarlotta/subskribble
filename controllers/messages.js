const { isEmpty, each } = require('lodash');
const promiseEach = require('bluebird').each;
const mailer = require('@sendgrid/mail');
const db = require('db');
const {
  createMessageTransaction,
  createNotification,
  deleteOneMessage,
  findTemplateByName,
  getAllEmailsByPlan,
  getSomeMessages,
  getMessageCount,
} = require('queries');
const {
  currentDate,
  createUniqueTemplateName,
  parseStringToNum,
  sendError,
} = require('helpers');
const {
  missingCreationParams,
  missingDeletionParams,
  missingQueryParams,
  unableToLocate,
} = require('errors');

module.exports = {
  create: async (req, res, done) => {
    const { template } = req.body;
    if (!template) return sendError(missingCreationParams, res, done);

    const uniquetemplatename = createUniqueTemplateName(template);
    const date = currentDate();

    try {
      await db.task('create-message', async (dbtask) => {
        const selectedTemplate = await dbtask.oneOrNone(findTemplateByName, [
          req.session.id,
          uniquetemplatename,
        ]);
        if (!selectedTemplate) return sendError(unableToLocate('template'), res, done);
        const {
          fromsender,
          subject,
          message,
          plans,
          templatename,
        } = selectedTemplate;

        const subscriberEmails = [];

        await promiseEach(plans, async (plan) => {
          const emails = await dbtask.any(getAllEmailsByPlan, [
            req.session.id,
            plan,
          ]);
          each(emails, ({ email }) => subscriberEmails.push(email));
        });

        if (isEmpty(subscriberEmails)) {
          return sendError(
            unableToLocate('subscribers in the selected plan(s)'),
            res,
            done,
          );
        }

        const msg = {
          to: subscriberEmails,
          from: fromsender,
          replyTo: fromsender,
          subject,
          html: message,
        };

        await mailer.sendMultiple(msg);

        await dbtask.none(createMessageTransaction, [
          req.session.id,
          templatename,
          fromsender,
          subject,
          currentDate,
          plans,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'mail_outline',
          `The following template: ${templatename} has been sent out to the subscibers in the following ${
            plans.length > 1 ? 'plans' : 'plan'
          }: ${plans}.`,
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
    const { id } = req.params;
    if (!id || id === 'null') return sendError(missingDeletionParams, res, done);
    const date = currentDate();

    try {
      await db.task('delete-message', async (dbtask) => {
        await dbtask.none(deleteOneMessage, [req.session.id, id]);

        await dbtask.none(createNotification, [
          req.session.id,
          'mail_outline',
          `The following message transaction #${
            req.params.id
          }, has been deleted.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
  fetchRecords: async (req, res, done) => {
    const { page } = req.query;
    let { limit } = req.query;

    if (!page || !limit) return sendError(missingQueryParams, res, done);

    limit = parseStringToNum(limit);
    const offset = parseStringToNum(page) * limit;

    try {
      const messages = await db.any(getSomeMessages, [
        req.session.id,
        limit,
        offset,
      ]);

      res.status(201).json({ messages });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
  fetchCounts: async (req, res, done) => {
    try {
      const messagecounts = await db.any(getMessageCount, [req.session.id]);

      res
        .status(201)
        .json({ messagecounts: parseStringToNum(messagecounts[0].count) });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // SENDS FIRST 10 RECORDS
  index: async (req, res, done) => {
    try {
      const messages = await db.any(getSomeMessages, [req.session.id, 10, 0]);

      res.status(201).json({ messages });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
};

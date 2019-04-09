const isEmpty = require('lodash/isEmpty');
const db = require('db');
const {
  createNotification,
  createTemplate,
  deleteOneTemplate,
  findTemplateById,
  getAllActivePlans,
  getAllActiveTemplates,
  getSomeTemplates,
  getTemplateCount,
  updateTemplate,
  updateTemplateStatus,
  selectTemplate,
} = require('queries');
const {
  createUniqueTemplateName,
  currentDate,
  parseStringToNum,
  sendError,
} = require('helpers');
const {
  createPlanFirst,
  createTemplateFirst,
  itemAlreadyExists,
  missingCreationParams,
  missingDeletionParams,
  missingQueryParams,
  missingSelectParams,
  missingUpdateParams,
  unableToLocate,
} = require('errors');

module.exports = {
  // CREATES TEMPLATES RECORD
  create: async (req, res, done) => {
    const {
      fromsender, plans, message, subject, templatename,
    } = req.body;
    if (!fromsender || isEmpty(plans) || !message || !subject || !templatename) return sendError(missingCreationParams, res, done);

    const uniquetemplatename = createUniqueTemplateName(templatename);
    const date = currentDate();

    try {
      await db.task('create-template', async (dbtask) => {
        const templateExists = await dbtask.oneOrNone(selectTemplate, [
          req.session.id,
          uniquetemplatename,
        ]);
        if (templateExists) return sendError(itemAlreadyExists('template'), res, done);

        await dbtask.none(createTemplate, [
          req.session.id,
          fromsender,
          plans,
          message,
          subject,
          templatename,
          uniquetemplatename,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'view_module',
          `A new template: ${templatename}, has been added to the following ${
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
      await db.task('delete-template', async (dbtask) => {
        const name = await dbtask.result(deleteOneTemplate, [
          req.session.id,
          id,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'view_module',
          `The following template: ${
            name.rows[0].templatename
          }, has been deleted.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES ACTIVE PLAN AND TEMPLATE RECORDS
  fetchAllActiveRecords: async (req, res, done) => {
    try {
      const activeplans = await db.any(getAllActivePlans, [req.session.id]);
      if (isEmpty(activeplans)) return sendError(createPlanFirst, res, done);

      const activetemplates = await db.any(getAllActiveTemplates, [
        req.session.id,
      ]);
      if (isEmpty(activetemplates)) return sendError(createTemplateFirst, res, done);

      res.status(201).json({ activetemplates });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
  fetchRecords: async (req, res, done) => {
    const { table, page } = req.query;
    let { limit } = req.query;

    if (!table || !page || !limit) return sendError(missingQueryParams, res, done);

    limit = parseStringToNum(limit);
    const offset = parseStringToNum(page) * limit;
    const status = table === 'activetemplates' ? ['active'] : ['inactive', 'suspended'];

    try {
      let activetemplates;
      let inactivetemplates;
      const templates = await db.any(
        getSomeTemplates(req.session.id, limit, offset, status),
      );

      if (table === 'activetemplates') {
        activetemplates = templates;
      } else {
        inactivetemplates = templates;
      }

      res.status(201).json({ activetemplates, inactivetemplates });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
  fetchCounts: async (req, res, done) => {
    try {
      const templates = await db.any(getTemplateCount, [req.session.id]);

      res.status(201).json({
        activetemplatescount: parseStringToNum(templates[0].active),
        inactivetemplatescount: parseStringToNum(templates[0].inactive),
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // SENDS FIRST 10 RECORDS
  index: async (req, res, done) => {
    try {
      await db.task('fetch-subscriber-index', async (dbtask) => {
        const activetemplates = await dbtask.any(
          getSomeTemplates(req.session.id, 10, 0, ['active']),
        );
        const inactivetemplates = await dbtask.any(
          getSomeTemplates(req.session.id, 10, 0, ['suspended']),
        );

        res.status(201).json({ activetemplates, inactivetemplates });
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
  updateOne: async (req, res, done) => {
    const { id } = req.params;
    const {
      fromsender, plans, message, subject, templatename,
    } = req.body;

    if (
      !fromsender
      || isEmpty(plans)
      || !message
      || !subject
      || !templatename
      || !id
      || id === 'null'
    ) return sendError(missingUpdateParams, res, done);

    const uniquetemplatename = createUniqueTemplateName(templatename);
    const date = currentDate();

    try {
      await db.task('update-template-record', async (dbtask) => {
        const template = await dbtask.one(updateTemplate, [
          req.session.id,
          id,
          fromsender,
          plans,
          message,
          subject,
          templatename,
          uniquetemplatename,
        ]);

        await dbtask.none(createNotification, [
          req.session.id,
          'view_module',
          `The following template: ${
            template.templatename
          }, has been successfully edited and updated.`,
          date,
        ]);

        res.status(201).send(null);
      });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
  // UPDATES A RECORD STATUS PER CLIENT-SIDE REQUEST
  updateStatus: async (req, res, done) => {
    const { id } = req.params;
    const { updateType, statusType } = req.body;

    if (!updateType || !statusType || !id || id === 'null') return sendError(missingUpdateParams, res, done);

    const date = currentDate();

    try {
      await db.task('update-template-status', async (dbtask) => {
        const template = await dbtask.one(updateTemplateStatus, [
          req.session.id,
          id,
          statusType,
        ]);

        const message = updateType === 'suspended'
          ? 'deactivated and is no longer valid for'
          : 'reactivated and is now valid for';
        await dbtask.none(createNotification, [
          req.session.id,
          'view_module',
          `The following template: ${
            template.templatename
          }, has been ${message} the following ${
            template.plans.length > 1 ? 'plans' : 'plan'
          }: ${template.plans}.`,
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
    const { id } = req.query;
    if (!id || id === 'null') return sendError(missingSelectParams, res, done);

    try {
      const template = await db.oneOrNone(findTemplateById, [
        req.session.id,
        id,
      ]);
      if (!template) return sendError(unableToLocate('template'), res, done);

      res.status(201).json({ ...template });
    } catch (err) {
      return sendError(err, res, done);
    }
  },
};

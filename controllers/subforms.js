module.exports = app => {
  const { db, query: { createForm, deleteOneForm, getSomeForms, getFormCount, updateOneForm, selectForm } } = app.database;
  const { parseStringToNum, sendError } = app.shared.helpers;
  const moment = app.get("moment");
  const createUniqueFormName = formname => ( formname.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-') )

  return {
    // CREATES FORMS RECORD
    create: async (req, res, next) => {
      if (!req.body) return sendError('Missing form creation parameters', res, next);

      const { formname, plans } = req.body;
      const uniqueFormName = createUniqueFormName(formname);
      try {
        const formExists = db.oneOrNone(selectForm(), [req.session.id, uniqueFormName]);
        if (formExists) return sendError('That form already exists. You must create a unique for name!');

        await db.none(createForm(), [req.session.id, formname, plans, uniqueFormName]);

        res.status(201).json({ message: `Succesfully created '${formname}' form.` });
      } catch (err) { return sendError(err, res, next); }
    },
    // DELETES REQURESTED RECORD
    deleteOne: async (req, res, next) => {
      if (!req.params.id) return sendError('Missing form delete parameters', res, next);

      try {
        const name = await db.result(deleteOneForm(), [req.params.id, req.session.id]);

        res.status(201).json({ message: `Succesfully deleted the '${name.rows[0].formname}' form.` });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
    fetchRecords: async (req, res, next) => {
      if (!req.query) return sendError('Missing query fetch parameters', res, next);

      let { table, limit, page } = req.query;
      limit = parseStringToNum(limit);
      const offset =  parseStringToNum(page) * limit;
      const status = table === 'activeforms' ? ['active'] : ['inactive', 'suspended'];

      try {
        let activeforms, inactiveforms;
        const forms = await db.any(getSomeForms(req.session.id, limit, offset, status));

        (table === "activeforms") ? activeforms = forms : inactiveforms = forms;

        res.status(201).json({ activeforms, inactiveforms });
      } catch (err) { return sendError(err, res, next); }
    },
    // FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
    fetchCounts: async (req, res, next) => {
      try {
        const forms = await db.any(getFormCount(), [req.session.id]);

        res.status(201).json({
          activeformscount: parseStringToNum(forms[0].active),
          inactiveformscount: parseStringToNum(forms[0].inactive)
        });
      } catch (err) { return sendError(err, res, next); }
    },
    // SENDS FIRST 10 RECORDS
    index: async (req, res, next) => {
      try {
        const activeforms = await db.any(getSomeForms(req.session.id, 10, 0, ['active']));
        const inactiveforms = await db.any(getSomeForms(req.session.id, 10, 0, ['suspended']));

        res.status(201).json({ activeforms, inactiveforms });
      } catch (err) { return sendError(err, res, next); }
    },
    // UPDATES A RECORD PER CLIENT-SIDE REQUEST (SUSPEND OR ACTIVATE)
    updateOne: async (req, res, next) => {
      if (!req.body || !req.params.id) return sendError('Missing form update parameters', res, next);
      const { id } = req.params;
      const { updateType, statusType } = req.body;
      const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;

      try {
        const form = await db.one(updateOneForm(), [statusType, id, req.session.id])

        res.status(201).json({ message: `Succesfully ${updateType} the '${form.formname}' form.` });
      } catch (err) { return sendError(err, res, next); }
    }
  }
}

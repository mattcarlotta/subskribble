module.exports = app => {
	const { db, query: { createTemplate, deleteOneTemplate, findTemplateById, getSomeTemplates, getTemplateCount, updateTemplate, updateTemplateStatus, selectTemplate } } = app.database;
	const { parseStringToNum, sendError } = app.shared.helpers;
	const moment = app.get("moment");
	const createUniqueTemplateName = name => ( name.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-') )

	return {
		// CREATES TEMPLATES RECORD
		create: async (req, res, next) => {
			if (!req.body) return sendError('Missing template creation parameters', res, next);

			const { fromsender, plans, message, subject, templatename } = req.body;
			const uniquetemplatename = createUniqueTemplateName(templatename);
			try {
				const templateExists = await db.oneOrNone(selectTemplate(), [req.session.id, uniquetemplatename]);
				if (templateExists) return sendError('That template already exists. You must create a unique template name!', res, next);

				await db.none(createTemplate(), [req.session.id, fromsender, plans, message, subject, templatename, uniquetemplatename]);

				res.status(201).json({ message: `Succesfully created '${templatename}' template.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// DELETES REQURESTED RECORD
		deleteOne: async (req, res, next) => {
			if (!req.params.id) return sendError('Missing template delete parameters', res, next);

			try {
				const name = await db.result(deleteOneTemplate(), [req.params.id, req.session.id]);

				res.status(201).json({ message: `Succesfully deleted the '${name.rows[0].templatename}' template.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES NEXT SET OF RECORDS DETERMINED BY CURRENT TABLE AND OFFSET
		fetchRecords: async (req, res, next) => {
			if (!req.query) return sendError('Missing query fetch parameters', res, next);

			let { table, limit, page } = req.query;
			limit = parseStringToNum(limit);
			const offset =  parseStringToNum(page) * limit;
			const status = table === 'activetemplates' ? ['active'] : ['inactive', 'suspended'];

			try {
				let activetemplates, inactivetemplates;
				const templates = await db.any(getSomeTemplates(req.session.id, limit, offset, status));

				(table === "activetemplates") ? activetemplates = templates : inactivetemplates = templates;

				res.status(201).json({ activetemplates, inactivetemplates });
			} catch (err) { return sendError(err, res, next); }
		},
		// FETCHES TOTAL # OF RECORDS PER TABLE FOR CLIENT-SIDE PAGINATION
		fetchCounts: async (req, res, next) => {
			try {
				const templates = await db.any(getTemplateCount(), [req.session.id]);

				res.status(201).json({
					activetemplatescount: parseStringToNum(templates[0].active),
					inactivetemplatescount: parseStringToNum(templates[0].inactive)
				});
			} catch (err) { return sendError(err, res, next); }
		},
		// SENDS FIRST 10 RECORDS
		index: async (req, res, next) => {
			try {
				const activetemplates = await db.any(getSomeTemplates(req.session.id, 10, 0, ['active']));
				const inactivetemplates = await db.any(getSomeTemplates(req.session.id, 10, 0, ['suspended']));

				res.status(201).json({ activetemplates, inactivetemplates });
			} catch (err) { return sendError(err, res, next); }
		},
		// UPDATES A RECORD STATUS PER CLIENT-SIDE REQUEST
		updateStatus: async (req, res, next) => {
			if (!req.body || !req.params.id) return sendError('Missing template update parameters', res, next);
			const { id } = req.params;
			const { updateType, statusType } = req.body;
			const endDate = updateType === 'suspended' ? moment().format("MMM DD, YYYY") : null;

			try {
				const template = await db.one(updateTemplateStatus(), [statusType, id, req.session.id])

				res.status(201).json({ message: `Succesfully ${updateType} the '${template.templatename}' template.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// UPDATES ENTIRE RECORD PER CLIENT-SIDE REQUEST
		updateOne: async (req, res, next) => {
			if (!req.body || !req.params.id) return sendError('Missing template update parameters', res, next);
			const { fromsender, plans, message, subject, templatename } = req.body;
			const uniquetemplatename = createUniqueTemplateName(templatename);

			try {
				const template = await db.one(updateTemplate(), [req.session.id, req.params.id, fromsender, plans, message, subject, templatename, uniquetemplatename])

				res.status(201).json({ message: `Succesfully updated the '${template.templatename}' template.` });
			} catch (err) { return sendError(err, res, next); }
		},
		// SELECTS A SINGLE RECORD
		selectOne: async (req, res, next) => {
			if (!req.query) return sendError('Missing template select parameters', res, next);

			try {
				const template = await db.oneOrNone(findTemplateById(), [req.session.id, req.query.id]);
				if (!template) return sendError("Unable to locate the template!", res, next);

				res.status(201).json({ ...template });
			} catch (err) { return sendError(err, res, next); }
		},
	}
}

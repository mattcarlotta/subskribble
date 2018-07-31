module.exports = app => {
	const { admin } = app.controllers;
	const { requireAdminAuth } = app.services.strategies;

	app.post('/api/admin/subscriber/signup', requireAdminAuth, admin.createSubscriber);
	app.post('/api/admin/plan/create', requireAdminAuth, admin.createPlan );
	app.delete('/api/admin/plan/delete', requireAdminAuth, admin.deletePlan );
}

module.exports = app => {
	const { subscribers: { create, index, deleteOne, fetchCounts, fetchRecords, updateStatus } } = app.controllers;
	const { requireAuth } = app.services.strategies;

	app.post('/api/subscribers/signup', requireAuth, create);
	app.get('/api/subscribers', requireAuth, index);
	app.get('/api/subscribercounts', requireAuth, fetchCounts);
	app.get('/api/subscribers/records', requireAuth, fetchRecords);
	app.put('/api/subscribers/update/:id', requireAuth, updateStatus);
	app.delete('/api/subscribers/delete?', requireAuth, deleteOne);
}

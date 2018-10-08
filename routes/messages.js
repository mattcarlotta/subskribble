module.exports = app => {
	const { messages: { create, index, deleteOne, fetchCounts, fetchRecords, selectOne, updateOne, updateStatus } } = app.controllers;
	const { requireAuth } = app.services.strategies;

	app.post('/api/messages/create', requireAuth, create);
	app.get('/api/messages', requireAuth, index);
	app.get('/api/messagecounts', requireAuth, fetchCounts);
	app.get('/api/messages/records', requireAuth, fetchRecords);
	app.delete('/api/messages/delete/:id', requireAuth, deleteOne);
}

module.exports = app => {
	const { transactions: { index, deleteOne, fetchCounts, fetchOne, fetchRecords, refundOne } } = app.controllers;
	const { requireAuth } = app.services.strategies;

	app.delete('/api/transactions/delete/:id', requireAuth, deleteOne);
	app.get('/api/transaction/record?', requireAuth, fetchOne);
	app.get('/api/transactioncounts', requireAuth, fetchCounts);
	app.get('/api/transactions/records', requireAuth, fetchRecords);
	app.post('/api/transaction/refund', requireAuth, refundOne);
	app.get('/api/transactions', requireAuth, index);
}

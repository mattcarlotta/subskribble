import {
  index,
  deleteOne,
  fetchCounts,
  fetchOne,
  fetchRecords,
  refundOne,
} from 'controllers/transactions';
import { requireAuth } from 'strategies';

export default (app) => {
  app.delete('/api/transactions/delete/:id', requireAuth, deleteOne);
  app.get('/api/transaction/record?', requireAuth, fetchOne);
  app.get('/api/transactioncounts', requireAuth, fetchCounts);
  app.get('/api/transactions/records', requireAuth, fetchRecords);
  app.post('/api/transaction/refund', requireAuth, refundOne);
  app.get('/api/transactions', requireAuth, index);
};

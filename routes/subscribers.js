import {
  create,
  index,
  deleteOne,
  fetchCounts,
  fetchRecords,
  updateStatus,
} from 'controllers/subscribers';
import { requireAuth } from 'strategies';

export default (app) => {
  app.post('/api/subscribers/signup', requireAuth, create);
  app.get('/api/subscribers', requireAuth, index);
  app.get('/api/subscribercounts', requireAuth, fetchCounts);
  app.get('/api/subscribers/records', requireAuth, fetchRecords);
  app.put('/api/subscribers/update/:id', requireAuth, updateStatus);
  app.delete('/api/subscribers/delete?', requireAuth, deleteOne);
};

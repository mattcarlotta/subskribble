import {
  create,
  index,
  deleteOne,
  fetchCounts,
  fetchRecords,
} from 'controllers/messages';
import { requireAuth } from 'strategies';

export default (app) => {
  app.post('/api/messages/create', requireAuth, create);
  app.get('/api/messages', requireAuth, index);
  app.get('/api/messagecounts', requireAuth, fetchCounts);
  app.get('/api/messages/records', requireAuth, fetchRecords);
  app.delete('/api/messages/delete/:id', requireAuth, deleteOne);
};

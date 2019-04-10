import {
  apply,
  create,
  index,
  deleteOne,
  fetchCounts,
  fetchRecords,
  updateOne,
  updateStatus,
  selectOne,
} from 'controllers/promotionals';
import { requireAuth } from 'strategies';

module.exports = (app) => {
  app.get('/api/promotionals/apply-promotion?', requireAuth, apply);
  app.post('/api/promotionals/create', requireAuth, create);
  app.get('/api/promotionals/promotional?', requireAuth, selectOne);
  app.delete('/api/promotionals/delete/:id', requireAuth, deleteOne);
  app.get('/api/promotionalcounts', requireAuth, fetchCounts);
  app.get('/api/promotionals/records', requireAuth, fetchRecords);
  app.get('/api/promotionals', requireAuth, index);
  app.put('/api/promotionals/edit/:id', requireAuth, updateOne);
  app.put('/api/promotionals/update/:id', requireAuth, updateStatus);
};

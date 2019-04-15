import {
  index,
  deleteAll,
  deleteOne,
  updateAll,
} from 'controllers/notifications';
import { requireAuth } from 'strategies';

export default (app) => {
  app.delete('/api/notifications/deleteall', requireAuth, deleteAll);
  app.delete('/api/notification/delete?', requireAuth, deleteOne);
  app.get('/api/notifications', requireAuth, index);
  app.put('/api/notification/markasread', requireAuth, updateAll);
};

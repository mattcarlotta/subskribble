import authRoutes from './auth';
import dashboardRoutes from './dashboard';
import messageRoutes from './messages';
import notifcationRoutes from './notifications';
import planRoutes from './plans';
import promotionalRoutes from './promotionals';
import subcriberRoutes from './subscribers';
import templateRoutes from './templates';
import transactionRoutes from './transactions';

export default (app) => {
  authRoutes(app);
  dashboardRoutes(app);
  messageRoutes(app);
  notifcationRoutes(app);
  planRoutes(app);
  promotionalRoutes(app);
  subcriberRoutes(app);
  templateRoutes(app);
  transactionRoutes(app);
};

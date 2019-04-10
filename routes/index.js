import authRoutes from './auth';
import dashboardRoutes from './dashboard';
import messageRoutes from './messages';
import notifcationRoutes from './notifications';
import planRoutes from './plans';
import promotionalRoutes from './promotionals';
import subcriberRoutes from './subscribers';
import templateRoutes from './templates';
import transactionRoutes from './transactions';

/*
export { default as authRoutes } from "./auth";
export { default as dashboardRoutes } from "./dashboard";
export { default as messageRoutes } from "./messages";
export { default as notifcationRoutes } from "./notifications";
export { default as planRoutes } from "./plans";
export { default as promotionalRoutes } from "./promotionals";
export { default as subcriberRoutes } from "./subscribers";
export { default as templateRoutes } from "./templates";
export { default as transactionRoutes } from "./transactions";
*/

const routes = (app) => {
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

export default routes;

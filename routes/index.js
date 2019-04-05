const authRoutes = require('./auth');
const dashboardRoutes = require('./dashboard');
const messageRoutes = require('./messages');
const notifcationRoutes = require('./notifications');
const planRoutes = require('./plans');
const promotionalRoutes = require('./promotionals');
const subcriberRoutes = require('./subscribers');
const templateRoutes = require('./templates');
const transactionRoutes = require('./transactions');

module.exports = (app) => {
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

import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import AuthReducer from './authReducer.js';
import DashboardReducer from './dashboardReducer.js';
import FormReducer from './formReducer.js';
import MessagesReducer from './messagesReducer.js';
import PlanReducer from './planReducer.js';
import PromoReducer from './promoReducer.js';
import NotificationReducer from './notificationReducer.js';
import ServerReducer from './serverReducer.js';
import SubscriberReducer from './subscriberReducer.js';
import TemplateReducer from './templateReducer.js';
import TransactionReducer from './transactionReducer.js';

const rootReducer = combineReducers({
  auth: AuthReducer,
  dashboard: DashboardReducer,
  messages: MessagesReducer,
  notes: NotificationReducer,
  plans: PlanReducer,
  promos: PromoReducer,
  routing: routerReducer,
  server: ServerReducer,
  subs: SubscriberReducer,
  templates: TemplateReducer,
  transactions: TransactionReducer,
  ...FormReducer,
});

export default (state, action) =>
  action.type === 'UNAUTH_USER'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);

import filter from 'lodash/filter';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as types from '../types';

const authReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case types.NO_SIGNEDIN_USER:
      return { ...state, loggedinUser: null };
    case types.SET_CURRENT_AVATAR:
      return { ...state, avatarURL: payload };
    case types.SET_NAVBAR_STATE:
      return { ...state, collapseSideNav: payload };
    case types.SET_SIGNEDIN_USER:
      return {
        ...state,
        avatarURL: payload.avatarurl,
        company: payload.company,
        loggedinUser: payload.email,
        firstName: payload.firstname,
        lastName: payload.lastname,
        collapseSideNav: payload.collapsesidenav,
        isGod: payload.isgod,
      };
    case types.USER_WAS_VERIFIED:
      return { ...state, userVerified: payload };
    default:
      return state;
  }
};

const dashboardReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case types.SET_DASHBOARD_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

const initialBasicPanelProps = {
  items: [],
  itemcount: 0,
};

const initialTabPanelProps = {
  activeitems: [],
  activeitemcount: 0,
  inactiveitems: [],
  inactiveitemcount: 0,
};

const messagesReducer = (state = initialBasicPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_MESSAGES:
      return { ...state, items: payload };
    case types.SET_INITIAL_MESSAGES:
      return { ...state, items: payload.messages };
    case types.SET_INITIAL_MESSAGECOUNTS:
      return { ...state, itemcount: payload };
    default:
      return state;
  }
};

const planReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_ACTIVE_PLANS:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_PLANS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_PLANS:
      return {
        ...state,
        activeitems: payload.activeplans,
        inactiveitems: payload.inactiveplans,
      };
    case types.SET_INITIAL_PLANCOUNTS:
      return {
        ...state,
        activeitemcount: payload.activeplancount,
        inactiveitemcount: payload.inactiveplancount,
      };
    default:
      return state;
  }
};

const promoReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.APPLY_PROMO_CODE:
      return { ...state, appliedPromoCode: payload };
    case types.SET_ACTIVE_PROMOS:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_PROMOS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_PROMOS:
      return {
        ...state,
        activeitems: payload.activepromos,
        inactiveitems: payload.inactivepromos,
      };
    case types.SET_INITIAL_PROMOCOUNTS:
      return {
        ...state,
        activeitemcount: payload.activepromocount,
        inactiveitemcount: payload.inactivepromocount,
      };
    default:
      return state;
  }
};

const filterNotifications = (notifications, deletedNote) =>
  filter(notifications, notification => notification.id !== deletedNote);

const notificationsReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case types.RESET_NOTIFICATIONS:
      return { ...state, readNotifications: [], unreadNotifications: [] };
    case types.SET_NOTIFICATIONS:
      return {
        ...state,
        readNotifications: payload.readnotifications,
        unreadNotifications: payload.unreadnotifications,
      };
    case types.FILTER_NOTIFICATIONS:
      return {
        ...state,
        readNotifications: filterNotifications(
          state.readNotifications,
          payload,
        ),
        unreadNotifications: filterNotifications(
          state.unreadNotifications,
          payload,
        ),
      };
    default:
      return state;
  }
};

const serverInitialState = {
  error: '',
  message: '',
};

const serverReducer = (state = serverInitialState, { payload, type }) => {
  switch (type) {
    case types.RESET_SERVER_MESSAGES:
      return { ...state, error: '', message: '' };
    case types.SERVER_ERROR:
      return { ...state, error: payload };
    case types.SERVER_MESSAGE:
      return { ...state, message: payload };
    default:
      return state;
  }
};

const subscriberReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_ACTIVE_SUBS:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_SUBS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_SUBS:
      return {
        ...state,
        activeitems: payload.activesubscribers,
        inactiveitems: payload.inactivesubscribers,
      };
    case types.SET_INITIAL_SUBCOUNTS:
      return {
        ...state,
        activeitemcount: payload.activesubscriberscount,
        inactiveitemcount: payload.inactivesubscriberscount,
      };
    default:
      return state;
  }
};

const templateReducer = (state = initialTabPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_ACTIVE_TEMPLATES:
      return { ...state, activeitems: payload };
    case types.SET_INACTIVE_TEMPLATES:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_TEMPLATES:
      return {
        ...state,
        activeitems: payload.activetemplates,
        inactiveitems: payload.inactivetemplates,
      };
    case types.SET_INITIAL_TEMPLATECOUNTS:
      return {
        ...state,
        activeitemcount: payload.activetemplatescount,
        inactiveitemcount: payload.inactivetemplatescount,
      };
    default:
      return state;
  }
};

const transactionReducer = (
  state = initialTabPanelProps,
  { payload, type },
) => {
  switch (type) {
    case types.SET_CHARGES:
      return { ...state, activeitems: payload };
    case types.SET_REFUNDS:
      return { ...state, inactiveitems: payload };
    case types.SET_INITIAL_TRANSACTIONS:
      return {
        ...state,
        activeitems: payload.chargetransactions,
        inactiveitems: payload.refundtransactions,
      };
    case types.SET_INITIAL_TRANSACTIONCOUNTS:
      return {
        ...state,
        activeitemcount: payload.chargecount,
        inactiveitemcount: payload.refundcount,
      };
    default:
      return state;
  }
};

const formReducers = {
  form: formReducer.plugin({
    CustomerPlanSignup: (state, { payload, type }) => {
      // <----- 'CustomerPlanSignup' is name of form given to reduxForm()
      switch (type) {
        case types.SET_BILLING_FORM_VALUES: // <----- Action triggered by toggle from 'CustomerPlanSignup'
          return {
            ...state, // <----- spreads out any previous redux state
            values: {
              ...state.values, // <----- spreads out any previous redux form values
              ...payload, // <----- initializes or resets billing${Name} fields from action creator
            },
          };
        case types.FORM_PROMO_CODE: // <----- Action triggered by removing promo tag
          return {
            ...state, // <----- spreads out any previous redux state
            values: {
              ...state.values, // <----- spreads out any previous redux form values
              ...payload, // <----- initializes or resets promoCode field from action creator
            },
          };
        default:
          return state;
      }
    },
  }),
};

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  messages: messagesReducer,
  notes: notificationsReducer,
  plans: planReducer,
  promos: promoReducer,
  server: serverReducer,
  subs: subscriberReducer,
  templates: templateReducer,
  transactions: transactionReducer,
  ...formReducers,
  routing,
});

export default (state, action) =>
  action.type === 'UNAUTH_USER'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);

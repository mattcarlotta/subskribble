import filter from 'lodash/filter';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const authReducer = (state = {}, { payload, type }) => {
	switch (type) {
		case types.AUTH_ERROR:
			return { ...state, error: payload };
		case types.AUTH_SUCCESS:
			return { ...state, success: payload };
		case types.FETCHING_USER:
			return { ...state, fetchingUser: payload };
		case types.RESET_NOTIFICATIONS:
			return { ...state, error: '', success: '' };
		case types.SET_SIGNEDIN_USER:
			return {
				...state,
				username: payload.user,
				isGod: payload.isGod
			};
		case types.UNAUTH_USER:
			return { ...state, username: null, isGod: null };
		default:
			return state;
	}
};

const planReducer = (state={}, { payload, type}) => {
	switch (type) {
		case types.SET_ACTIVE_PLANS:
			return { ...state, activeitems: payload };
		case types.SET_INACTIVE_PLANS:
			return { ...state, inactiveitems: payload };
		case types.SET_INITIAL_PLANS:
			return {
				...state,
				activeitems: payload.activeplans,
				inactiveitems: payload.inactiveplans
			}
		case types.SET_INITIAL_PLANCOUNTS:
			return {
				...state,
				activeitemcount: payload.activeplancount,
				inactiveitemcount: payload.inactiveplancount
			}
		default:
			return state;
	}
}

const promoReducer = (state={}, { payload, type}) => {
	switch (type) {
		case types.SET_ACTIVE_PROMOS:
			return { ...state, activeitems: payload };
		case types.SET_INACTIVE_PROMOS:
			return { ...state, inactiveitems: payload };
		case types.SET_INITIAL_PROMOS:
			return {
				...state,
				activeitems: payload.activepromos,
				inactiveitems: payload.inactivepromos
			}
		case types.SET_INITIAL_PROMOCOUNTS:
			return {
				...state,
				activeitemcount: payload.activepromocount,
				inactiveitemcount: payload.inactivepromocount
			}
		default:
			return state;
	}
}

const filterNotifications = (notifications, payload) => (
	filter(notifications, notification => (notification.id !== payload))
)

const notificationsReducer = (state={}, { payload, type }) => {
	switch (type) {
		case types.SET_READ_NOTIFICATIONS:
			return  { ...state, readNotifications: payload };
		case types.SET_UNREAD_NOTIFICATIONS:
			return  { ...state, unreadNotifications: payload };
		case types.FILTER_NOTIFICATIONS:
			return  {
				...state,
				readNotifications: filterNotifications(state.readNotifications, payload),
				unreadNotifications: filterNotifications(state.unreadNotifications, payload)
			};
		default:
			return state;
	}
}

const serverReducer = (state={}, { payload, type }) => {
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
}

const subscriberReducer = (state={}, { payload, type }) => {
	switch (type) {
		case types.SET_ACTIVE_SUBS:
			return { ...state, activeitems: payload };
		case types.SET_INACTIVE_SUBS:
			return { ...state, inactiveitems: payload };
		case types.SET_INITIAL_SUBS:
			return {
				...state,
				activeitems: payload.activesubscribers,
				inactiveitems: payload.inactivesubscribers
			}
		case types.SET_INITIAL_SUBCOUNTS:
			return {
				...state,
				activeitemcount: payload.activesubscriberscount,
				inactiveitemcount: payload.inactivesubscriberscount
			}
		default:
			return state;
	}
}

const transactionReducer = (state={}, { payload, type }) => {
	switch (type) {
		case types.SET_CHARGES:
			return { ...state, activeitems: payload };
		case types.SET_REFUNDS:
			return { ...state, inactiveitems: payload };
		case types.SET_INITIAL_TRANSACTIONS:
			return {
				...state,
				activeitems: payload.chargetransactions,
				inactiveitems: payload.refundtransactions
			}
		case types.SET_INITIAL_TRANSACTIONCOUNTS:
			return {
				...state,
				activeitemcount: payload.chargecount,
				inactiveitemcount: payload.refundcount
			}
		default:
			return state;
	}
}

const formReducers = {
  form: formReducer.plugin({
    CustomerPlanSignup: (state, action) => {   // <----- 'CustomerPlanSignup' is name of form given to reduxForm()
      switch(action.type) {
        case types.SET_BILLING_FORM_VALUES: 	// <----- Action triggered by toggle from 'CustomerPlanSignup'
          return {
            ...state, 	// <----- spreads out any previous redux state
            values: {
              ...state.values, // <----- spreads out any previous redux form values
							...action.payload // <----- initializes or resets billing${Name} fields from action creator
            }
          }
        default:
          return state
      }
    }
  })
}

const rootReducer = combineReducers({
	auth: authReducer,
	notes: notificationsReducer,
	plans: planReducer,
	promos: promoReducer,
	server: serverReducer,
	subs: subscriberReducer,
	transactions: transactionReducer,
	...formReducers,
	routing
});

export default rootReducer;

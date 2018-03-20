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
		// case SET_ACTIVE_PLANS:
		// 	return { ...state, activeplans: payload };
		// case SET_INACTIVE_PLANS:
		// 	return { ...state, inactiveplans: payload };
		case types.SET_INITIAL_PLANS:
			return {
				...state,
				activeplans: payload.activeplans,
				inactiveplans: payload.inactiveplans
			}
		case types.SET_INITIAL_PLANCOUNTS:
			return {
				...state,
				activeplancount: payload.activeplancount,
				inactiveplancount: payload.inactiveplancount
			}
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
			return { ...state, activesubs: payload };
		// case SET_ACTIVE_SUBS_COUNT:
		// 	return { ...state, activesubcount: action.payload }
		case types.SET_INACTIVE_SUBS:
			return { ...state, inactivesubs: payload };
		// case SET_INACTIVE_SUBS_COUNT:
		// 	return { ...state, inactivesubcount: action.payload };
		case types.SET_INITIAL_SUBS:
			return {
				...state,
				activesubs: payload.activesubscribers,
				inactivesubs: payload.inactivesubscribers
			}
		case types.SET_INITIAL_SUBCOUNTS:
			return {
				...state,
				activesubcount: payload.activesubscriberscount,
				inactivesubcount: payload.inactivesubscriberscount
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
	plans: planReducer,
	server: serverReducer,
	subs: subscriberReducer,
	...formReducers,
	routing
});

export default rootReducer;

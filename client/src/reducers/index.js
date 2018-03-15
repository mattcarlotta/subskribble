import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	FETCHING_USER,
	RESET_NOTIFICATIONS,
	RESET_SERVER_ERROR,
	SERVER_ERROR,
	SET_ACTIVE_SUBS,
	// SET_ACTIVE_SUBS_COUNT,
	SET_INACTIVE_SUBS,
	// SET_INACTIVE_SUBS_COUNT,
	SET_INITIAL_SUBS,
	SET_INITIAL_SUBCOUNTS,
	SET_SIGNEDIN_USER,
	SET_BILLING_FORM_VALUES,
	UNAUTH_USER
} from '../actions/types';

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case AUTH_SUCCESS:
			return { ...state, success: action.payload };
		case FETCHING_USER:
			return { ...state, fetchingUser: action.payload };
		case RESET_NOTIFICATIONS:
			return { ...state, error: '', success: '' };
		case SET_SIGNEDIN_USER:
			return {
				...state,
				username: action.payload.user,
				isGod: action.payload.isGod
			};
		case UNAUTH_USER:
			return { ...state, username: null, isGod: null };
		default:
			return state;
	}
};

const tableReducer = (state={}, action) => {
	switch (action.type) {
		case SET_ACTIVE_SUBS:
			return { ...state, activesubs: action.payload };
		// case SET_ACTIVE_SUBS_COUNT:
		// 	return { ...state, activesubcount: action.payload }
		case SET_INACTIVE_SUBS:
			return { ...state, inactivesubs: action.payload };
		// case SET_INACTIVE_SUBS_COUNT:
		// 	return { ...state, inactivesubcount: action.payload };
		case SET_INITIAL_SUBS:
			return {
				...state,
				activesubs: action.payload.activesubscribers,
				inactivesubs: action.payload.inactivesubscribers
			}
		case SET_INITIAL_SUBCOUNTS:
			return {
				...state,
				activesubcount: action.payload.activesubscriberscount,
				inactivesubcount: action.payload.inactivesubscriberscount
			}
		default:
			return state;
	}
}

const serverReducer = (state={}, action) => {
	switch (action.type) {
		case RESET_SERVER_ERROR:
			console.log('triggered');
			return { ...state, error: '' };
		case SERVER_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
}

const formReducers = {
  form: formReducer.plugin({
    CustomerPlanSignup: (state, action) => {   // <----- 'CustomerPlanSignup' is name of form given to reduxForm()
      switch(action.type) {
        case SET_BILLING_FORM_VALUES: 	// <----- Action triggered by toggle from 'CustomerPlanSignup'
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
	fields: tableReducer,
	server: serverReducer,
	...formReducers,
	routing
});

export default rootReducer;

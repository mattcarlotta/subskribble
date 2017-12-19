import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	FETCHING_USER,
	RESET_NOTIFICATIONS,
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
	...formReducers,
	routing
});

export default rootReducer;

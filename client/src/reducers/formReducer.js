import { reducer as formReducer } from 'redux-form';
import * as types from '../types';

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

export default formReducers;

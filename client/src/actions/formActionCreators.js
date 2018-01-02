import * as app from 'axios';
// import { browserHistory } from 'react-router';
//
// import configAuth from './configAuth';
import dispatchError from './dispatchError';
import dispatchSuccess from './dispatchSuccess';
import { SET_BILLING_FORM_VALUES } from './types';
import { formValueSelector } from 'redux-form';

// Add new rocketboard promo code
export const addNewPromoCode = (formProps) => {
  return dispatch => {
    app.post(`api/create-promo-code`, { formProps })
    .then(response => {
      dispatchSuccess(dispatch, response.data.message);
    })
    .catch(({ response }) => {
      dispatchError(dispatch, response.data.err);
    })
  }
}



// Add new rocketboard form
export const addNewForm = (formProps) => {
  return dispatch => {
    app.post(`api/add-new-form`, { formProps })
    .then(response => {
      dispatchSuccess(dispatch, response.data.message);
    })
    .catch(({ response }) => {
      dispatchError(dispatch, response.data.err);
    })
  }
}

// Add new rocketboard template
export const addNewTemplate = (formProps) => {
  return dispatch => {
    app.post(`api/add-new-template`, { formProps })
    .then(response => {
      dispatchSuccess(dispatch, response.data.message);
    })
    .catch(({ response }) => {
      dispatchError(dispatch, response.data.err);
    })
  }
}

// Form information for registering to a plan
export const customerRegisterToPlan = (formProps) => {
  return dispatch => {
    app.post(`api/customer-signup`, { formProps })
    .then(response => {
      dispatchSuccess(dispatch, response.data.message);
    })
    .catch(({ response }) => {
      dispatchError(dispatch, response.data.err);
    })
  }
}

// Register to newsletter
export const registerToNewsletter = (email) => {
  return dispatch => {
    app.post(`api/register-to-newsletter`, { email })
    .then(response => {
      dispatchSuccess(dispatch, response.data.message);
    })
    .catch(({ response }) => {
      dispatchError(dispatch, response.data.err);
    })
  }
}


// Send email to support
export const sendSupportEmail = ({name, email, message}) => {
  return dispatch => {
    app.post(`api/send-support-email`, { name, email, message })
    .then(response => {
      dispatchSuccess(dispatch, response.data.message);
    })
    .catch(({ response }) => {
      dispatchError(dispatch, response.data.err);
    })
  }
}

const updateBillingFields = (state) => {
  const selector = formValueSelector('CustomerPlanSignup');
  return {
    billingAddress: state ? selector(state, 'contactAddress') : undefined,
    billingUnit: state ? selector(state, 'contactUnit') : undefined,
    billingCity: state ? selector(state, 'contactCity') : undefined,
    billingState: state ? selector(state, 'contactState'): undefined,
    billingZip: state ? selector(state, 'contactZip') : undefined
  }
}

// setting billing fields values from customer contact form
export const setBillingFieldValues = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_BILLING_FORM_VALUES,
      payload: updateBillingFields(getState())
    })
  }
}

// resetting billing fields values from customer contact form
export const resetBillingFieldValues = () => {
  return {
    type: SET_BILLING_FORM_VALUES,
    payload: updateBillingFields()
  }
}

import * as app from 'axios';
// import { browserHistory } from 'react-router';
//
// import configAuth from './configAuth';
import dispatchError from './dispatchError';
import dispatchSuccess from './dispatchSuccess';
import { SET_BILLING_FORM_VALUES } from './types';
import { formValueSelector } from 'redux-form';

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

// setting billing fields values from customer contact form
export const setBillingFieldValues = () => {
  return (dispatch, getState) => {
    const state = getState();
    const selector = formValueSelector('CustomerContactForm');

    dispatch({
      type: SET_BILLING_FORM_VALUES,
      payload: {
        billingAddress: selector(state, 'address'),
        billingUnit: selector(state, 'unit'),
        billingCity: selector(state, 'city'),
        billingState: selector(state, 'state'),
        billingZip: selector(state, 'zip')
      }
    })
  }
}

// setting billing fields values from customer contact form
export const resetBillingFieldValues = () => {
  return {
    type: SET_BILLING_FORM_VALUES,
    payload: {
      billingAddress: undefined,
      billingUnit: undefined,
      billingCity: undefined,
      billingState: undefined,
      billingZip: undefined
    }
  }
}

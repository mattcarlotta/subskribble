import * as app from 'axios';
// import { browserHistory } from 'react-router';
//
// import configAuth from './configAuth';
import dispatchError from './dispatchError';
import dispatchSuccess from './dispatchSuccess';

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

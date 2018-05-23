import app from './axiosConfig';
import * as types from './types';
import { formValueSelector } from 'redux-form';
import { browserHistory } from 'react-router';

// Add new form
const addNewForm = formProps => dispatch => (
  app.post(`form/create`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Add new promo code
const addNewPromoCode = formProps => dispatch => (
  app.post(`promotional/create`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Add new template
const addNewTemplate = formProps => dispatch => (
  app.post(`template/create`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Register to newsletter
const registerToNewsletter = email => dispatch => (
  app.post(`register-to-newsletter`, { email })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// resetting billing fields values from customer contact form
const resetBillingFieldValues = () => ({
  type: types.SET_BILLING_FORM_VALUES,
  payload: updateBillingFields()
})

// setting billing fields values from customer contact form
const setBillingFieldValues = () => (dispatch, getState) => (
  dispatch({
    type: types.SET_BILLING_FORM_VALUES,
    payload: updateBillingFields(getState())
  })
)

// Send email to support
const sendSupportEmail = ({name, email, message}) => dispatch => (
  app.post(`send-support-email`, { name, email, message })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Form information for registering to a plan
const subRegisterToPlan = ({ contactAddress, contactCity, contactEmail, contactFirstName, contactLastName, contactPhone, contactState, contactZip, selectedPlan }) => dispatch => (
  app.post(`subscribers/signup`, { subscriber: `${contactFirstName} ${contactLastName}`, contactAddress, contactCity, contactEmail, contactPhone, contactState, contactZip, selectedPlan })
  .then(({data: {message}}) => {
    dispatch({ type: types.SERVER_MESSAGE, payload: message })
    browserHistory.push('/subskribble/subscribers');
  })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Updates billing fields
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


export {
  addNewForm,
  addNewPromoCode,
  addNewTemplate,
  registerToNewsletter,
  resetBillingFieldValues,
  setBillingFieldValues,
  sendSupportEmail,
  subRegisterToPlan
}

import * as app from 'axios';
import * as types from './types';
import { formValueSelector } from 'redux-form';

// Add new form
const addNewForm = formProps => dispatch => (
  app.post(`api/add-new-form`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Add new promo code
const addNewPromoCode = formProps => dispatch => (
  app.post(`api/create-promo-code`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Add new template
const addNewTemplate = formProps => dispatch => (
  app.post(`api/add-new-template`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Form information for registering to a plan
const customerRegisterToPlan = formProps => dispatch => (
  app.post(`api/customer-signup`, { formProps })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Register to newsletter
const registerToNewsletter = email => dispatch => (
  app.post(`api/register-to-newsletter`, { email })
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
  app.post(`api/send-support-email`, { name, email, message })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
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
  customerRegisterToPlan,
  registerToNewsletter,
  resetBillingFieldValues,
  setBillingFieldValues,
  sendSupportEmail
}

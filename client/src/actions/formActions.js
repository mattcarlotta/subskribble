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
const addNewPromo = formProps => dispatch => (
  app.post(`promotionals/create`, { ...formProps })
  .then(({data: {message}}) => {
    dispatch({ type: types.SERVER_MESSAGE, payload: message })
    browserHistory.push('/subskribble/promotionals')
  })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Add new template
const addNewTemplate = formProps => dispatch => (
  app.post(`templates/create`, { ...formProps })
  .then(({data: {message}}) => {
    dispatch({ type: types.SERVER_MESSAGE, payload: message })
    browserHistory.push('/subskribble/templates')
  })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Attempts to apply promo to subscription
const applyPromo = (promocode, plan) => dispatch => (
  app.get(`promotionals/apply-promotion?promocode=${promocode}&plan=${plan}`)
  .then(({data: {promotional}}) => {
    dispatch({ type: types.APPLY_PROMO_CODE, payload: promotional })
  })
  .catch(err => {
    dispatch(resetPromo())
    dispatch({ type: types.SERVER_ERROR, payload: err })
  })
)

// Edits a selected promo
const editPromo = (id, formProps) => dispatch => (
  app.put(`promotionals/edit/${id}`, { ...formProps })
  .then(({data: {message}}) => {
    dispatch({ type: types.SERVER_MESSAGE, payload: message })
    browserHistory.push('/subskribble/promotionals')
  })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Edits a selected template
const editTemplate = (id, formProps) => dispatch => (
  app.put(`templates/edit/${id}`, { ...formProps })
  .then(({data: {message}}) => {
    dispatch({ type: types.SERVER_MESSAGE, payload: message })
    browserHistory.push('/subskribble/templates')
  })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Register to newsletter
const registerToNewsletter = email => dispatch => (
  app.post(`register-to-newsletter`, { email })
  .then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// Resets applied promo
const resetPromo = () => dispatch => {
  dispatch({ type: types.APPLY_PROMO_CODE, payload: undefined })
  dispatch({ type: types.FORM_PROMO_CODE, payload: { promoCode: undefined }})
}

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
const subRegisterToPlan = ({ contactFirstName, contactLastName, ...rest }) => dispatch => (
  app.post(`subscribers/signup`, { subscriber: `${contactFirstName} ${contactLastName}`, ...rest })
  .then(({data: {message}}) => {
    dispatch({ type: types.SERVER_MESSAGE, payload: message })
    dispatch({ type: types.APPLY_PROMO_CODE, payload: undefined })
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
  addNewPromo,
  addNewTemplate,
  applyPromo,
  editPromo,
  editTemplate,
  registerToNewsletter,
  resetBillingFieldValues,
  resetPromo,
  setBillingFieldValues,
  sendSupportEmail,
  subRegisterToPlan
}

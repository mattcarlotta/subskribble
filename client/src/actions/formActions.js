import { formValueSelector } from 'redux-form';
import { browserHistory } from 'react-router';
import { app } from 'utils';
import * as types from 'types';
import { fetchNotifications } from 'actions/notificationActions';

// Add new plan
const addNewPlan = formProps => dispatch =>
  app
    .post(`plans/create`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/plans');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Add new promo code
const addNewPromo = formProps => dispatch =>
  app
    .post(`promotionals/create`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/promotionals');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Add new template
const addNewTemplate = formProps => dispatch =>
  app
    .post(`templates/create`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/templates');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Resets applied promo
const resetPromo = () => dispatch => {
  dispatch({ type: types.APPLY_PROMO_CODE, payload: undefined });
  dispatch({ type: types.FORM_PROMO_CODE, payload: { promoCode: undefined } });
};

// Attempts to apply promo to subscription
const applyPromo = (promocode, plan) => dispatch =>
  app
    .get(`promotionals/apply-promotion?promocode=${promocode}&plan=${plan}`)
    .then(({ data }) =>
      dispatch({ type: types.APPLY_PROMO_CODE, payload: data.promotional }),
    )
    .catch(err => {
      dispatch(resetPromo());
      dispatch({ type: types.SERVER_ERROR, payload: err });
    });

// Edits a selected plan
const editPlan = (id, formProps) => dispatch =>
  app
    .put(`plans/edit/${id}`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/plans');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Edits a selected promo
const editPromo = (id, formProps) => dispatch =>
  app
    .put(`promotionals/edit/${id}`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/promotionals');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Edits a selected template
const editTemplate = (id, formProps) => dispatch =>
  app
    .put(`templates/edit/${id}`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/templates');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Updates billing fields
const selector = formValueSelector('CustomerPlanSignup');
const updateBillingFields = state => ({
  billingAddress: state ? selector(state, 'contactAddress') : undefined,
  billingUnit: state ? selector(state, 'contactUnit') : undefined,
  billingCity: state ? selector(state, 'contactCity') : undefined,
  billingState: state ? selector(state, 'contactState') : undefined,
  billingZip: state ? selector(state, 'contactZip') : undefined,
});

// resetting billing fields values from customer contact form
const resetBillingFieldValues = () => ({
  type: types.SET_BILLING_FORM_VALUES,
  payload: updateBillingFields(),
});

// Setting billing fields values from customer contact form
const setBillingFieldValues = () => (dispatch, getState) =>
  dispatch({
    type: types.SET_BILLING_FORM_VALUES,
    payload: updateBillingFields(getState()),
  });

// Send messages to subscribers
const sendMessageToSubs = formProps => dispatch =>
  app
    .post(`messages/create`, { ...formProps })
    .then(() => {
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/messages');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Send email to support
// const sendSupportEmail = ({ name, email, message }) => dispatch =>
//   app
//     .post(`send-support-email`, { name, email, message })
//     .then(({ data: { message } }) =>
//       dispatch({ type: types.SERVER_MESSAGE, payload: message }),
//     )
//     .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Registers a new subscriber to a plan
const subRegisterToPlan = ({
  contactFirstName,
  contactLastName,
  ...rest
}) => dispatch =>
  app
    .post(`subscribers/signup`, {
      subscriber: `${contactFirstName} ${contactLastName}`,
      ...rest,
    })
    .then(() => {
      dispatch({ type: types.APPLY_PROMO_CODE, payload: undefined });
      dispatch(fetchNotifications());
      browserHistory.push('/subskribble/subscribers');
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export {
  addNewPlan,
  addNewPromo,
  addNewTemplate,
  applyPromo,
  editPlan,
  editPromo,
  editTemplate,
  resetBillingFieldValues,
  resetPromo,
  setBillingFieldValues,
  sendMessageToSubs,
  // sendSupportEmail,
  subRegisterToPlan,
};

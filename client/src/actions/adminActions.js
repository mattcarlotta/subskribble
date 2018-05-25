import app from './axiosConfig';
import * as types from './types';
import plans from './planActions';
import subscribers from './subscriberActions';

const planActions = {
  // Creates a fake plan
  createPlan: () => dispatch => (
    app.post(`admin/plan/create`)
    .then(({data: {message}}) => {
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
      dispatch(plans.fetchItemCounts());
      dispatch(plans.fetchItems());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  deletePlan: () => dispatch => (
    app.delete(`admin/plan/delete`)
    .then(({data: {message}}) => {
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
      dispatch(plans.fetchItemCounts());
      dispatch(plans.fetchItems());
      dispatch(subscribers.fetchItemCounts());
      dispatch(subscribers.fetchItems());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

const subscriberActions = {
  // Creates a fake subscriber
  createSubscriber: () => dispatch => (
    app.post(`admin/subscriber/signup`)
    .then(({data: {message}}) => {
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
      dispatch(subscribers.fetchItemCounts());
      dispatch(subscribers.fetchItems());
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

export default {
  ...planActions,
  ...subscriberActions
}

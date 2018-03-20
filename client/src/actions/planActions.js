import app from './axiosConfig';
import {
  SERVER_ERROR,
  // SERVER_MESSAGE,
  SET_INITIAL_PLANS,
  SET_INITIAL_PLANCOUNTS
} from './types';

// Deletes requested subscriber from DB
// const deletePlan = id => dispatch => (
//   app.delete(`plan/delete/${id}`)
//   .then(({data: {message}}) => {
//     dispatch(fetchPlanCounts())
//     dispatch(fetchPlans())
//     dispatch({ type: SERVER_MESSAGE, payload: message })
//   })
//   .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
// )

// Fetches next/prev via sortByNum active subs from DB
// const fetchNextPlans = (table, page, sortByNum) => dispatch => (
//   app.get(`plans/records?table=${table}&page=${page}&limit=${sortByNum}`)
//   .then(({data: {activesubscribers, inactivesubscribers }}) => {
//     activesubscribers && dispatch({ type: SET_ACTIVE_SUBS, payload: activesubscribers })
//     inactivesubscribers && dispatch({ type: SET_INACTIVE_SUBS, payload: inactivesubscribers })
//   })
//   .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
// )
//
// Fetches initial 10 active/inactive plans from DB
const fetchPlans = () => dispatch => (
  app.get('plans')
  .then(({data: {activeplans, inactiveplans}}) => {
    dispatch({ type: SET_INITIAL_PLANS, payload: {activeplans, inactiveplans}})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)
//
// Fetches initial subscribers counts from DB
const fetchPlanCounts = () => dispatch => (
  app.get('plancounts')
  .then(({data: {activeplancount, inactiveplancount}}) => {
    dispatch({ type: SET_INITIAL_PLANCOUNTS, payload: { activeplancount, inactiveplancount }})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)
//
// // Sets subscribers status to active or suspended
// const updateSubscriber = (updateType, statusType, userid) => dispatch => (
//   app.put(`subscribers/update/${userid}`, { statusType, updateType })
//   .then(({data: {message}}) => {
//     dispatch(fetchSubscriberCounts())
//     dispatch(fetchSubscribers())
//     dispatch({ type: SERVER_MESSAGE, payload: message })
//   })
//   .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
// )

export {
  // deleteSubscriber,
  // fetchNextSubscribers,
  fetchPlans,
  fetchPlanCounts,
  // updateSubscriber
}

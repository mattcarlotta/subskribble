import app from './axiosConfig';
import {
  SERVER_ERROR,
  SERVER_MESSAGE,
  SET_ACTIVE_PLANS,
  SET_INACTIVE_PLANS,
  SET_INITIAL_PLANS,
  SET_INITIAL_PLANCOUNTS,
} from './types';

// Deletes requested plan from DB
const deletePlan = id => dispatch => (
  app.delete(`plans/delete/${id}`)
  .then(({data: {message}}) => {
    dispatch(fetchPlanCounts())
    dispatch(fetchPlans())
    dispatch({ type: SERVER_MESSAGE, payload: message })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches next/prev via sortByNum active/inactive plans from DB
const fetchNextPlans = (table, page, sortByNum) => dispatch => (
  app.get(`plans/records?table=${table}&page=${page}&limit=${sortByNum}`)
  .then(({data: {activeplans, inactiveplans }}) => {
    activeplans && dispatch({ type: SET_ACTIVE_PLANS, payload: activeplans })
    inactiveplans && dispatch({ type: SET_INACTIVE_PLANS, payload: inactiveplans })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial 10 active/inactive plans from DB
const fetchPlans = () => dispatch => (
  app.get('plans')
  .then(({data: {activeplans, inactiveplans}}) => {
    dispatch({ type: SET_INITIAL_PLANS, payload: {activeplans, inactiveplans}})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial subscribers counts from DB
const fetchPlanCounts = () => dispatch => (
  app.get('plancounts')
  .then(({data: {activeplancount, inactiveplancount}}) => {
    dispatch({ type: SET_INITIAL_PLANCOUNTS, payload: { activeplancount, inactiveplancount }})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Sets plan status to active or suspended
const updatePlan = (updateType, statusType, id) => dispatch => (
  app.put(`plans/update/${id}`, { statusType, updateType })
  .then(({data: {message}}) => {
    dispatch(fetchPlanCounts())
    dispatch(fetchPlans())
    dispatch({ type: SERVER_MESSAGE, payload: message })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

export {
  deletePlan,
  fetchNextPlans,
  fetchPlans,
  fetchPlanCounts,
  updatePlan
}

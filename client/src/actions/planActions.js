import app from './axiosConfig';
import * as types from './types';
import { browserHistory } from 'react-router';

export default {
  // Deletes requested plan from DB
  deleteAction: id => dispatch => (
    app.delete(`plans/delete/${id}`)
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches next/prev via sortByNum active/inactive plans from DB
  fetchAction: (table, page, sortByNum) => dispatch => (
    app.get(`plans/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({data: {activeplans, inactiveplans }}) => {
      activeplans && dispatch({ type: types.SET_ACTIVE_PLANS, payload: activeplans })
      inactiveplans && dispatch({ type: types.SET_INACTIVE_PLANS, payload: inactiveplans })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // fetch all active plans
  fetchAllActivePlans: () => dispatch => (
    app.get(`plans/only-active`)
    .catch(err => {
      dispatch({ type: types.SERVER_ERROR, payload: err })
      browserHistory.goBack();
    })
  ),
  // Fetches initial 10 active/inactive plans from DB
  fetchItems: () => dispatch => (
    app.get('plans')
    .then(({data: {activeplans, inactiveplans}}) => {
      dispatch({ type: types.SET_INITIAL_PLANS, payload: {activeplans, inactiveplans}})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial subscribers counts from DB
  fetchItemCounts: () => dispatch => (
    app.get('plancounts')
    .then(({data: {activeplancount, inactiveplancount}}) => {
      dispatch({ type: types.SET_INITIAL_PLANCOUNTS, payload: { activeplancount, inactiveplancount }})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches a plan for editing
  fetchPlan: (id) => dispatch => (
    app.get(`plans/plan?id=${id}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets plan status to active or suspended
  updateAction: (updateType, statusType, id) => dispatch => (
    app.put(`plans/update/${id}`, { statusType, updateType })
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

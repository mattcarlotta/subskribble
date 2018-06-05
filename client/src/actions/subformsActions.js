import app from './axiosConfig';
import * as types from './types';

export default {
  // Deletes requested form from DB
  deleteAction: formid => dispatch => (
    app.delete(`forms/delete/${formid}`)
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches next/prev via sortByNum active/inactive subs from DB
  fetchAction: (table, page, sortByNum) => dispatch => (
    app.get(`forms/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({data: {activeforms, inactiveforms}}) => {
      activeforms && dispatch({ type: types.SET_ACTIVE_SUBS, payload: activeforms })
      inactiveforms && dispatch({ type: types.SET_INACTIVE_SUBS, payload: inactiveforms })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial 10 active/inactive forms from DB
  fetchItems: () => dispatch => (
    app.get('forms')
    .then(({data: {activeforms, inactiveforms}}) => {
      dispatch({ type: types.SET_INITIAL_SUBS, payload: {activeforms, inactiveforms}})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial forms counts from DB
  fetchItemCounts: () => dispatch => (
    app.get('formcounts')
    .then(({data: {activeformscount, inactiveformscount}}) => {
      dispatch({ type: types.SET_INITIAL_SUBCOUNTS, payload: { activeformscount, inactiveformscount }})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets forms status to active or suspended
  updateAction: (updateType, statusType, formid) => dispatch => (
    app.put(`forms/update/${formid}`, { statusType, updateType })
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

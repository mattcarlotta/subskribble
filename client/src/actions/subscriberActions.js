import app from './axiosConfig';
import * as types from './types';

app.interceptors.response.use(response => (response), error => (Promise.reject(error.response.data.err)))

// Deletes requested subscriber from DB
export default {
  deleteAction: userid => dispatch => (
    app.delete(`subscribers/delete/${userid}`)
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches next/prev via sortByNum active/inactive subs from DB
  fetchAction: (table, page, sortByNum) => dispatch => (
    app.get(`subscribers/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({data: {activesubscribers, inactivesubscribers}}) => {
      activesubscribers && dispatch({ type: types.SET_ACTIVE_SUBS, payload: activesubscribers })
      inactivesubscribers && dispatch({ type: types.SET_INACTIVE_SUBS, payload: inactivesubscribers })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial 10 active/inactive subscribers from DB
  fetchItems: () => dispatch => (
    app.get('subscribers')
    .then(({data: {activesubscribers, inactivesubscribers}}) => {
      dispatch({ type: types.SET_INITIAL_SUBS, payload: {activesubscribers, inactivesubscribers}})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial subscribers counts from DB
  fetchItemCounts: () => dispatch => (
    app.get('subscribercounts')
    .then(({data: {activesubscriberscount, inactivesubscriberscount}}) => {
      dispatch({ type: types.SET_INITIAL_SUBCOUNTS, payload: { activesubscriberscount, inactivesubscriberscount }})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets subscribers status to active or suspended
  updateAction: (updateType, statusType, userid) => dispatch => (
    app.put(`subscribers/update/${userid}`, { statusType, updateType })
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

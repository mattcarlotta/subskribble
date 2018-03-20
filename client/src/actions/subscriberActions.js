import app from './axiosConfig';
import {
  SERVER_ERROR,
  SERVER_MESSAGE,
  SET_INITIAL_SUBS,
  SET_INITIAL_SUBCOUNTS,
  SET_ACTIVE_SUBS,
  SET_INACTIVE_SUBS,
} from './types';

app.interceptors.response.use(response => (response), error => (Promise.reject(error.response.data.err)))

// Deletes requested subscriber from DB
const deleteAction = userid => dispatch => (
  app.delete(`subscribers/delete/${userid}`)
  .then(({data: {message}}) => {
    dispatch(fetchItemCounts())
    dispatch(fetchItems())
    dispatch({ type: SERVER_MESSAGE, payload: message })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches next/prev via sortByNum active/inactive subs from DB
const fetchAction = (table, page, sortByNum) => dispatch => (
  app.get(`subscribers/records?table=${table}&page=${page}&limit=${sortByNum}`)
  .then(({data: {activesubscribers, inactivesubscribers}}) => {
    activesubscribers && dispatch({ type: SET_ACTIVE_SUBS, payload: activesubscribers })
    inactivesubscribers && dispatch({ type: SET_INACTIVE_SUBS, payload: inactivesubscribers })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial 10 active/inactive subscribers from DB
const fetchItems = () => dispatch => (
  app.get('subscribers')
  .then(({data: {activesubscribers, inactivesubscribers}}) => {
    dispatch({ type: SET_INITIAL_SUBS, payload: {activesubscribers, inactivesubscribers}})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial subscribers counts from DB
const fetchItemCounts = () => dispatch => (
  app.get('subscribercounts')
  .then(({data: {activesubscriberscount, inactivesubscriberscount}}) => {
    dispatch({ type: SET_INITIAL_SUBCOUNTS, payload: { activesubscriberscount, inactivesubscriberscount }})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Sets subscribers status to active or suspended
const updateAction = (updateType, statusType, userid) => dispatch => (
  app.put(`subscribers/update/${userid}`, { statusType, updateType })
  .then(({data: {message}}) => {
    dispatch(fetchItemCounts())
    dispatch(fetchItems())
    dispatch({ type: SERVER_MESSAGE, payload: message })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

export {
  deleteAction,
  fetchAction,
  fetchItems,
  fetchItemCounts,
  updateAction
}

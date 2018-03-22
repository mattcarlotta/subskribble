import app from './axiosConfig';
import {
  SERVER_ERROR,
  SERVER_MESSAGE,
  SET_INITIAL_PROMOS,
  SET_INITIAL_PROMOCOUNTS,
  SET_ACTIVE_PROMOS,
  SET_INACTIVE_PROMOS,
} from './types';

// Deletes requested promotionals from DB
const deleteAction = userid => dispatch => (
  app.delete(`promotionals/delete/${userid}`)
  .then(({data: {message}}) => {
    dispatch(fetchItemCounts())
    dispatch(fetchItems())
    dispatch({ type: SERVER_MESSAGE, payload: message })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches next/prev via sortByNum active/inactive promos from DB
const fetchAction = (table, page, sortByNum) => dispatch => (
  app.get(`promotionals/records?table=${table}&page=${page}&limit=${sortByNum}`)
  .then(({data: {activepromos, inactivepromos}}) => {
    activepromos && dispatch({ type: SET_ACTIVE_PROMOS, payload: activepromos })
    inactivepromos && dispatch({ type: SET_INACTIVE_PROMOS, payload: inactivepromos })
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial 10 active/inactive promotionals from DB
const fetchItems = () => dispatch => (
  app.get('promotionals')
  .then(({data: {activepromos, inactivepromos}}) => {
    dispatch({ type: SET_INITIAL_PROMOS, payload: {activepromos, inactivepromos}})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Fetches initial promotionals counts from DB
const fetchItemCounts = () => dispatch => (
  app.get('promotionalcounts')
  .then(({data: {activepromocount, inactivepromocount}}) => {
    dispatch({ type: SET_INITIAL_PROMOCOUNTS, payload: { activepromocount, inactivepromocount }})
  })
  .catch(err => dispatch({ type: SERVER_ERROR, payload: err }))
)

// Sets promotionals status to active or suspended
const updateAction = (updateType, statusType, userid) => dispatch => (
  app.put(`promotionals/update/${userid}`, { statusType, updateType })
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

import app from './axiosConfig';
import * as types from './types';

export default {
  // Deletes requested promotionals from DB
  deleteAction: id => dispatch => (
    app.delete(`promotionals/delete/${id}`)
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches next/prev via sortByNum active/inactive promos from DB
  fetchAction: (table, page, sortByNum) => dispatch => (
    app.get(`promotionals/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({data: {activepromos, inactivepromos}}) => {
      activepromos && dispatch({ type: types.SET_ACTIVE_PROMOS, payload: activepromos })
      inactivepromos && dispatch({ type: types.SET_INACTIVE_PROMOS, payload: inactivepromos })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial promotionals counts from DB
  fetchItems: () => dispatch => (
    app.get('promotionals')
    .then(({data: {activepromos, inactivepromos}}) => {
      dispatch({ type: types.SET_INITIAL_PROMOS, payload: {activepromos, inactivepromos}})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial promotionals counts from DB
  fetchItemCounts: () => dispatch => (
    app.get('promotionalcounts')
    .then(({data: {activepromocount, inactivepromocount}}) => {
      dispatch({ type: types.SET_INITIAL_PROMOCOUNTS, payload: { activepromocount, inactivepromocount }})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches a promo for editing
  fetchPromo: (id) => dispatch => (
    app.get(`promotionals/promotional?id=${id}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets promotionals status to active or suspended
  updateAction: (updateType, statusType, userid) => dispatch => (
    app.put(`promotionals/update/${userid}`, { statusType, updateType })
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

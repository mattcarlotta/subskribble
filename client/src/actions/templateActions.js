import app from './axiosConfig';
import * as types from './types';

export default {
  // Deletes requested template from DB
  deleteAction: id => dispatch => (
    app.delete(`templates/delete/${id}`)
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches next/prev via sortByNum active/inactive subs from DB
  fetchAction: (table, page, sortByNum) => dispatch => (
    app.get(`templates/records?table=${table}&page=${page}&limit=${sortByNum}`)
    .then(({data: {activetemplates, inactivetemplates}}) => {
      activetemplates && dispatch({ type: types.SET_ACTIVE_TEMPLATES, payload: activetemplates })
      inactivetemplates && dispatch({ type: types.SET_INACTIVE_TEMPLATES, payload: inactivetemplates })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial 10 active/inactive templates from DB
  fetchItems: () => dispatch => (
    app.get('templates')
    .then(({data: {activetemplates, inactivetemplates}}) => {
      dispatch({ type: types.SET_INITIAL_TEMPLATES, payload: {activetemplates, inactivetemplates}})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches initial templates counts from DB
  fetchItemCounts: () => dispatch => (
    app.get('templatecounts')
    .then(({data: {activetemplatescount, inactivetemplatescount}}) => {
      dispatch({ type: types.SET_INITIAL_TEMPLATECOUNTS, payload: { activetemplatescount, inactivetemplatescount }})
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets templates status to active or suspended
  updateAction: (updateType, statusType, id) => dispatch => (
    app.put(`templates/update/${id}`, { statusType, updateType })
    .then(({data: {message}}) => {
      dispatch(this.a.fetchItemCounts())
      dispatch(this.a.fetchItems())
      dispatch({ type: types.SERVER_MESSAGE, payload: message })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

import app from './axiosConfig';
import * as types from './types';

export default {
  // Deletes notifications from DB
  deleteNotification: (id, userid) => dispatch => (
    app.delete(`notification/delete?id=${id}&userid=1`)
    .then(() => dispatch({ type: types.FILTER_NOTIFICATIONS, payload: id}))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches unread/read notifications from DB
  fetchNotifications: userid => dispatch => (
    app.get(`notifications/1`)
    .then(({data: {unreadNotifications, readNotifications}}) => {
      dispatch({ type: types.SET_NOTIFICATIONS, payload: {unreadNotifications, readNotifications} })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Removes all notifications from DB
  removeAllNotifications: userid => dispatch => (
    app.delete(`notifications/deleteall/1`)
    .then(() => dispatch({ type: types.RESET_NOTIFICATIONS }))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets all notifications to read
  updateNotifications: userid => dispatch => (
    app.put(`notification/markasread/1`)
    .then(() => dispatch(this.a.fetchNotifications()))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

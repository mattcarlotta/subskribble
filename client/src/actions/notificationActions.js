import app from './axiosConfig';
import * as types from './types';

export default {
  // Deletes notifications from DB
  deleteNotification: id => dispatch => (
    app.delete(`notification/delete?id=${id}`)
    .then(() => dispatch({ type: types.FILTER_NOTIFICATIONS, payload: id}))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches unread/read notifications from DB
  fetchNotifications: () => dispatch => (
    app.get(`notifications`)
    .then(({data: {unreadNotifications, readNotifications}}) => {
      dispatch({ type: types.SET_NOTIFICATIONS, payload: {unreadNotifications, readNotifications} })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Removes all notifications from DB
  removeAllNotifications: userid => dispatch => (
    app.delete(`notifications/deleteall`)
    .then(() => dispatch({ type: types.RESET_NOTIFICATIONS }))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets all notifications to read
  updateNotifications: () => dispatch => (
    app.put(`notification/markasread`)
    .then(() => dispatch(this.a.fetchNotifications()))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

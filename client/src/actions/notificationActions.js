import app from './axiosConfig';
import * as types from './types';

export default {
  // Deletes notifications from DB
  deleteNotification: userid => dispatch => (
    app.delete(`notification/delete/${userid}`)
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Fetches unread notifications from DB
  fetchNotifications: userid => dispatch => (
    app.get(`notifications/${userid}`)
    .then(({data: {unreadNotifications, readNotifications}}) => {
      dispatch({ type: types.SET_UNREAD_NOTIFICATIONS, payload: unreadNotifications })
      dispatch({ type: types.SET_READ_NOTIFICATIONS, payload: readNotifications })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets notifications status to read
  updateNotifications: userid => dispatch => (
    app.put(`notification/markasread`)
    .then(() => dispatch({ type: types.FILTER_NOTIFICATIONS, payload: userid }))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

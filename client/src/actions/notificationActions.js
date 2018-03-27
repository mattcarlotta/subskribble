import app from './axiosConfig';
import * as types from './types';

export default {
  // Fetches unread notifications from DB
  fetchNotifications: userid => dispatch => (
    app.get(`notifications/${userid}`)
    .then(({data: {notifications}}) => {
      dispatch({ type: types.SET_NOTIFICATIONS, payload: notifications })
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  ),
  // Sets notifications status to read
  updateNotifications: userid => dispatch => (
    app.put(`notification/update/${userid}`)
    .then(() => dispatch({ type: types.FILTER_NOTIFICATIONS, payload: userid }))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
  )
}

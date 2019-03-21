import { app } from 'utils';
import * as types from 'types';

// Deletes notifications from DB
const deleteNotification = id => dispatch =>
  app
    .delete(`notification/delete?id=${id}`)
    .then(() => dispatch({ type: types.FILTER_NOTIFICATIONS, payload: id }))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Fetches unread/read notifications from DB
const fetchNotifications = () => dispatch =>
  app
    .get(`notifications`)
    .then(({ data: { unreadnotifications, readnotifications } }) => {
      if (unreadnotifications || readnotifications) {
        dispatch({
          type: types.SET_NOTIFICATIONS,
          payload: { unreadnotifications, readnotifications },
        });
      }
    })
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Removes all notifications from DB
const removeAllNotifications = () => dispatch =>
  app
    .delete(`notifications/deleteall`)
    .then(() => dispatch({ type: types.RESET_NOTIFICATIONS }))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

// Sets all notifications to read
const updateNotifications = () => dispatch =>
  app
    .put(`notification/markasread`)
    .then(() => dispatch(fetchNotifications()))
    .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }));

export {
  deleteNotification,
  fetchNotifications,
  removeAllNotifications,
  updateNotifications,
};

import filter from 'lodash/filter';
import * as types from 'types';

const filterNotifications = (notifications, deletedNote) =>
  filter(notifications, notification => notification.id !== deletedNote);

const NotificationsReducer = (state = {}, { payload, type }) => {
  switch (type) {
    case types.RESET_NOTIFICATIONS:
      return { ...state, readNotifications: [], unreadNotifications: [] };
    case types.SET_NOTIFICATIONS:
      return {
        ...state,
        readNotifications: payload.readnotifications,
        unreadNotifications: payload.unreadnotifications,
      };
    case types.FILTER_NOTIFICATIONS:
      return {
        ...state,
        readNotifications: filterNotifications(
          state.readNotifications,
          payload,
        ),
        unreadNotifications: filterNotifications(
          state.unreadNotifications,
          payload,
        ),
      };
    default:
      return state;
  }
};

export default NotificationsReducer;

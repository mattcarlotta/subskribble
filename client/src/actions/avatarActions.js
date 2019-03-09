import { avatarAPI } from '../utils';
import * as types from '../types';
import { fetchNotifications } from './notificationActions';

// attempts to delete current avatar
const deleteAvatar = () => dispatch =>
  avatarAPI
    .delete(`avatar/delete`)
    .then(() =>
      dispatch({ type: types.SET_CURRENT_AVATAR, payload: undefined }),
    )
    .catch(err =>
      dispatch({ type: types.SERVER_ERROR, payload: err.toString() }),
    );

// attempts to delete current a recently removed account's avatar
const deleteAccountAvatar = (token, userid) => dispatch =>
  avatarAPI
    .delete(`avatar/delete-account`, { data: { token, userid } })
    .catch(err =>
      dispatch({ type: types.SERVER_ERROR, payload: err.toString() }),
    );

// attempts to fetch
const fetchAvatarOnLogin = () => dispatch =>
  avatarAPI
    .get(`avatar/current-user`)
    .then(({ data }) => {
      if (data) {
        dispatch({
          type: types.SET_CURRENT_AVATAR,
          payload: data.avatarurl,
        });
      }
    })
    .catch(err =>
      dispatch({ type: types.SERVER_ERROR, payload: err.toString() }),
    );

// attempts to update current avatar
const updateAvatar = formData => dispatch =>
  avatarAPI
    .put(`avatar/update`, formData)
    .then(({ data: { avatarurl } }) => {
      dispatch({ type: types.SET_CURRENT_AVATAR, payload: avatarurl });
      dispatch(fetchNotifications());
    })
    .catch(err =>
      dispatch({ type: types.SERVER_ERROR, payload: err.toString() }),
    );

// attempts to upload avatar
const uploadAvatar = formData => dispatch =>
  avatarAPI
    .post(`avatar/create`, formData)
    .then(({ data: { avatarurl } }) => {
      dispatch({ type: types.SET_CURRENT_AVATAR, payload: avatarurl });
      dispatch(fetchNotifications());
    })
    .catch(err =>
      dispatch({ type: types.SERVER_ERROR, payload: err.toString() }),
    );

export {
  deleteAvatar,
  deleteAccountAvatar,
  fetchAvatarOnLogin,
  updateAvatar,
  uploadAvatar,
};

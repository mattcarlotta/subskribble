import { avatarAPI } from './axiosConfig';
import * as types from './types';

// attempts to delete current avatar
const deleteAvatar = () => dispatch => (
	avatarAPI.delete(`avatar/delete`)
	.then(() => dispatch({ type: types.SET_CURRENT_AVATAR, payload: undefined }))
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// attempts to delete current a recently removed account's avatar
const deleteAccountAvatar = (token, userid) => dispatch => (
	avatarAPI.delete(`avatar/delete-account`, { data: { token, userid }})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// attempts to update current avatar
const updateAvatar = formData => dispatch => (
	avatarAPI.put(`avatar/update`, formData)
	.then(({data: {avatarurl, message}}) => {
		dispatch({ type: types.SET_CURRENT_AVATAR, payload: avatarurl })
		dispatch({ type: types.SERVER_MESSAGE, payload: message })
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// attempts to upload avatar
const uploadAvatar = formData => dispatch => (
	avatarAPI.post(`avatar/create`, formData)
	.then(({data: {avatarurl, message}}) => {
		dispatch({ type: types.SET_CURRENT_AVATAR, payload: avatarurl })
		dispatch({ type: types.SERVER_MESSAGE, payload: message })
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

export {
	deleteAvatar,
	deleteAccountAvatar,
	updateAvatar,
	uploadAvatar
}

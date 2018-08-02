import { avatarAPI } from './axiosConfig';
import * as types from './types';
import { browserHistory } from 'react-router';

// fetches avatar
// const fetchAvatar = () => dispatch => (
// 	avatarAPI.get(`avatar/fetch-user-avatar`)
// 	.then(({data: {avatarurl}}) => {
// 		avatarurl && dispatch({ type: types.SET_CURRENT_AVATAR, payload: avatarurl })
// 	})
// 	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
// )

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
	// fetchAvatar,
	uploadAvatar
}

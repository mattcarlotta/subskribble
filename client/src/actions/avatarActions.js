import { imageAPI } from './axiosConfig';
import * as types from './types';

// fetches avatar
const fetchAvatar = () => dispatch => (
	imageAPI.get(`avatar/get-image`)
	.then(({data: {message}}) => {
		dispatch({ type: types.SERVER_MESSAGE, payload: message })
		// dispatch({ type: types.APPLY_PROMO_CODE, payload: undefined })
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// attempts to upload avatar
const uploadAvatar = image => dispatch => (
	imageAPI.post(`avatar/create`, { image })
	.then(({data: {message}}) => {
		dispatch({ type: types.SERVER_MESSAGE, payload: message })
		// dispatch({ type: types.APPLY_PROMO_CODE, payload: undefined })
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

export {
	fetchAvatar,
	uploadAvatar
}
